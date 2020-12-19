<template>
    <b-container>
      <br>
        <login-form />
    </b-container>
</template>

<script>
import LoginForm from "@/domain/shared/components/auth/loginForm";

export default {
  metaInfo: {
    title: "Login",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    LoginForm
  }
};
</script>

<style scoped>

</style>
