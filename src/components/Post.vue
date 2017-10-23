<template>
    <b-container>
        <div class="row">
            <div class="col-md-8"><br>
                <h1>{{ post.title }}</h1>
                <p>{{ post.body }}</p>
                <small>Posted on {{ post.createdAt | postedOn }}
                      by <a :href="post.author | atUsername">{{ post.author }}</a>
                </small>
                <br><br>
                <pre>{{ post }}</pre>
            </div>
        </div>
    </b-container>
</template>

<script>
import { api } from "../Api";
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
    this.getPost(this.$route.params.slug);
  },

  methods: {
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

</style>