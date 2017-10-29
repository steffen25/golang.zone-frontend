<template>
    <b-container>
        <div class="row">
            <div class="col-md-8"><br>
                <h1>{{ post.title }}</h1>
                  <router-link v-if="isLoggedIn && currentUser.admin" 
                               :to="{ name: 'update.post', params: { slug: post.slug }}"> 
                    <i @click="getCurrentPost(post)" class="fa fa-pencil fa-fw update-post-icon" aria-hidden="true"></i>
                  </router-link>
                <p v-html="post.body" class="card-text">
                  {{ post.body }}
                </p>
                <small>Posted on {{ post.createdAt | postedOn }}
                by <router-link :to="{ path: '/@' + post.userId }">{{ post.author }}
                </router-link>
                </small>
            </div>
        </div>
    </b-container>
</template>

<script>
import { api } from "@/Api";
import moment from "moment";

export default {
  name: "Post",
  data() {
    return {
      loading: false,
      post: []
    };
  },

  created() {
    let slug = this.$route.params.slug;
    this.getPost(this.$route.params.slug);
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser: function() {
      return this.$store.getters.getUser;
    }
  },

  methods: {
    getCurrentPost(post) {
      this.$store.dispatch("setPost", post);
    },
    getPost(slug) {
      this.$Progress.start();
      this.loading = true;
      return new Promise((resolve, reject) => {
        api
          .get("posts/" + slug)
          .then(response => {
            this.$Progress.finish();
            this.loading = false;
            this.post = response.data.data;
            resolve();
          })
          .catch(error => {
            this.$Progress.finish();
            this.loading = false;
            this.$router.push("/page-not-found");
            reject(error);
          });
      });
    }
  },

  filters: {
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