<template>
    <b-container>
      <br>
        <create-post />
    </b-container>
</template>

<script>
import createPost from "@/domain/shared/components/posts/create";

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
