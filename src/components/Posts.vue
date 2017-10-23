<template>
  <b-container>
    <div class="row">
      <div class="col-md-8">
        <div v-if="loading" class="">Loading...</div>
        <div v-if="posts && posts.length" class="card mb-4"> <br>
          <!-- img-src="https://placekitten.com/1000/300" img-alt="Image" img-top -->
          <b-card v-for="post of posts" :key="post.id" 
                  :title="post.title | capitalizeTitle" 
                  footer-tag="footer" 
                  tag="article" 
                  class="mb-4">
            <p class="card-text">
              {{ post.body }}
            </p>
            <router-link :to="{ name: 'show.post', params: { slug: post.slug }}">
              <b-button variant="primary">Read More →</b-button>
            </router-link>
            <span slot="footer" class="text-muted">
                      Posted on {{ post.createdAt | postedOn }}
                      by <a :href="post.author | atUsername">{{ post.author }}</a>
                    </span>
          </b-card>
        </div>
  
        <div class="mb-4">
          <div class="row">
            <div class="col-4">
              <router-link :to="{ name: 'PostsPage', params: { page: pagination.currentPage - 1 }}">
                <button class="btn btn-default paginateBtn float-right"
                        :disabled="!pagination.prevPageUrl">
                        « Previous
                </button>
              </router-link>
            </div>
            <div class="col-4 text-center">
              <span style="vertical-align: -webkit-baseline-middle">Page {{ pagination.currentPage }} of {{ pagination.lastPage }}</span>
            </div>
            <div class="col-4">
              <router-link :to="{ name: 'PostsPage', params: {page: pagination.currentPage + 1}}">
                <button class="btn btn-default paginateBtn float-right"
                        :disabled="!pagination.nextPageUrl">
                        Next »
                </button>
              </router-link>
            </div>
          </div>
        </div>
  
      </div>
    </div>
    <pre>{{ pagination }}</pre>
  </b-container>
</template>

<script>
import { api } from "../Api";
import moment from "moment";

export default {
  name: "Posts",
  data() {
    return {
      pagination: {
        to: 1,
        from: 1,
        perPage: 10, // posts per page
        currentPage: 1, // current page (it will be automatically updated when users clicks on some page number).
        total: 0 // total number of posts
      },
      offset: 4, // left and right padding from the pagination <span>,just change it to see effects
      posts: [],
      errors: [],
      loading: false
    };
  },

  created() {
    const page = parseInt(this.$route.params.page, 10);
    var pageParam = null;
    if (this.$route.params.page === undefined) {
      pageParam = 1;
    } else {
      pageParam = page;
    }
    this.getPosts(pageParam).then(() => {
      if (pageParam > this.pagination.lastPage) {
        this.$router.push("/posts");
      }
    });
  },

  watch: {
    $route(to, from) {
      if (from.params.page !== to.params.page) {
        return this.getPosts(to.params.page);
      }
    }
  },

  methods: {
    getPosts(page) {
      this.$Progress.start();
      this.loading = true;
      return new Promise((resolve, reject) => {
        api
          .get("posts", {
            params: {
              page: page
            }
          })
          .then(response => {
            this.$Progress.finish();
            this.loading = false;
            this.pagination = response.data.pagination;
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
    },
    nextPage() {
      const page = parseInt(this.$route.params.page, 10);
      if (page < this.pagination.total / this.pagination.perPage) {
        const nextPage = page + 1;
        this.$router.push(`/posts/${nextPage}`);
      }
    },
    previousPage() {
      const page = parseInt(this.$route.params.page, 10);
      if (page > 1) {
        const previousPage = page - 1;
        this.$router.push(`/posts/${previousPage}`);
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paginateBtn {
  cursor: pointer;
}
</style>
