<template>
<b-container>
  <br>
    <register-form />
</b-container>
</template>

<script>
import registerForm from "@/components/auth/registerForm";

export default {
  metaInfo: {
    title: "Register",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    registerForm
  }
};
</script>

<style scoped>

</style>