<template>
<b-container>
    <h1>{{ user.name }}</h1>
    <div><b>E-mail: </b>{{ user.email }}</div>
    <small>User Object</small>
    <pre>{{ user }}</pre>
    <small>User Posts({{ posts.length }}) Object</small>
    <pre>{{ posts }}</pre>
</b-container>
</template>

<script>
import { getUserById, getUserPosts } from "@/service/userService";

export default {
  data() {
    return {
      user: {},
      posts: {},
      loading: false
    };
  },

  created() {
    let userId = this.$route.params.name;
    this.getUser(userId);
    this.getUserPosts(userId);
  },

  methods: {
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
  }
};
</script>

<style scoped>

</style>