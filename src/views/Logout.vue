<template>
    <div>

    </div>
</template>

<script>
import {
  logout,
  clearRefreshToken,
  clearAuthToken,
  clearUser
} from "@/service/authService";

export default {
  beforeCreate() {
    console.log("logout");
    this.$Progress.start();
    this.$store
      .dispatch("logoutUser")
      .then(response => {
        this.$Progress.finish();
        clearRefreshToken();
        clearAuthToken();
        clearUser();
        this.$router.push({ name: "Home" });
      })
      .catch(error => {
        this.$Progress.finish();
      });
  }
};
</script>

<style scoped>

</style>