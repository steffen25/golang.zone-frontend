<template>
<b-container>
    <index-posts per-page="5" />
</b-container>
</template>

<script>
import indexPosts from "@/domain/shared/components/posts/index";

export default {
  metaInfo: {
    title: "Posts",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    indexPosts
  }
};
</script>

<style scoped>

</style>
