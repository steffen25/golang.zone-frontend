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
  metaInfo: {
    title: "Logout",
    titleTemplate: '%s - Golang.Zone'
  },
  beforeCreate() {
    this.$Progress.start();
    this.$store
      .dispatch("logoutUser")
      .then(response => {
        this.$Progress.finish();
        clearRefreshToken();
        clearAuthToken();
        clearUser();
        this.$router.push({ name: "Home" });
        this.$notify({
          group: "auth",
          type: "success",
          title: "Logout successful!",
          text: "You have logged out successfully",
          duration: 3000,
          speed: 500
        });
      })
      .catch(() => {
        this.$Progress.finish();
        this.$notify({
          group: "auth",
          type: "error",
          title: "Logout failed!",
          text: "Logout failed please try again.",
          duration: 3000,
          speed: 500
        });
      });
  }
};
</script>

<style scoped>

</style>
