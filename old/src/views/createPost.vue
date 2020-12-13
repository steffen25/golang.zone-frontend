<template>
    <b-container>
      <br>
        <create-post />
    </b-container>
</template>

<script>
import createPost from "@/components/posts/create";

export default {
  metaInfo: {
    title: "Create post",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    createPost
  }
};
</script>

<style scoped>

</style>