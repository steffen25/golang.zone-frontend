<template>
<b-container>
<div class="row">
  <div v-if="user" class="col-md-8">
    <br>
    <h1>{{ user.name }}</h1>
    <div><b>E-mail: </b>{{ user.email }}</div>
    <div><b>Member since: </b>{{ user.createdAt | postedOn }}</div>
    <div v-if="posts">{{ user.name }} got <b>({{ posts.length }})</b> Posts</div>
    <br>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="posts && posts.length" class="card mb-4">
      <!-- img-src="https://placekitten.com/1000/300" img-alt="Image" img-top -->
            <b-card v-for="post of posts" :key="post.id"
              footer-tag="footer"
              tag="article"
              class="mb-4">
                <div>
                  <h4 class="card-title update-post">{{ post.title | capitalizeTitle }}</h4>
                  <router-link v-if="isLoggedIn && currentUser.admin" :to="{ name: 'update.post', params: { slug: post.slug }}">
                    <i @click="getCurrentPost(post)" class="fa fa-pencil fa-fw update-post-icon" aria-hidden="true"></i>
                  </router-link>
                </div>
        <p v-html="$options.filters.test(post.body)" class="card-text">
          {{ post.body }}
        </p>
        <router-link :to="{ name: 'show.post', params: { slug: post.slug }}">
          <b-button @click="getCurrentPost(post)" variant="primary">Read More →</b-button>
        </router-link>
        <span slot="footer" class="text-muted">
                  Posted on {{ post.createdAt | postedOn }}
                by <router-link :to="{ path: '/@' + post.userId }">{{ post.author }}
                </router-link>
                </span>
      </b-card>
    </div>

  </div>
</div>

</b-container>
</template>

<script>
import { getUserById, getUserPosts } from "@/service/userService";
import moment from "moment";

export default {
  data() {
    return {
      user: {},
      posts: {},
      loading: false
    };
  },

  created() {
    let userId = this.$route.params.id;
    this.getUser(userId);
    this.getUserPosts(userId);
  },

  computed: {
    currentUser: function() {
      return this.$store.getters.getUser;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    getCurrentPost(post) {
      this.$store.dispatch("setPost", post);
    },
    getUser(id) {
      this.$Progress.start();
      this.loading = true;
      return new Promise((resolve, reject) => {
        getUserById(id)
          .then(response => {
            this.$Progress.finish();
            this.loading = false;
            this.user = response.data.data;
            resolve();
          })
          .catch(error => {
            this.$Progress.finish();
            this.loading = false;
            this.$router.replace("/page-not-found");
            reject(error);
          });
      });
    },
    getUserPosts(id) {
      this.$Progress.start();
      this.loading = true;
      return new Promise((resolve, reject) => {
        getUserPosts(id)
          .then(response => {
            this.$Progress.finish();
            this.loading = false;
            this.posts = response.data.data;
            resolve();
          })
          .catch(error => {
            this.$Progress.finish();
            this.loading = false;
            this.$router.replace("/page-not-found");
            reject(error);
          });
      });
    }
  },

  filters: {
    test(value) {
      return value.substring(0, 200) + "...";
    },
    postedOn(value) {
      let date = moment(value);
      let now = moment();
      let diffInDays = date.from(now);
      let diffInYears = now.diff(date, "years");
      if (diffInYears !== 0) {
        return date.format("MMMM Do YYYY");
      }
      if (diffInDays === "a day ago") {
        return "Yesterday";
      } else if (diffInDays === "2 days ago") {
        return "Day Before Yesterday";
      }
      return date.format("MMMM Do");
    },
    capitalizeTitle(value) {
      return value
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
    },
    atUsername(value) {
      return "@" + value;
    }
  }
};
</script>

<style scoped>
.update-post {
  display: inline-block;
}
.update-post-icon {
  color: #c9c9c9;
}
.update-post-icon:hover {
  color: #333;
}
</style>
