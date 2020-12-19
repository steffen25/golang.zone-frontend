<template>
<b-container>
    <show-post />
</b-container>
</template>

<script>
import showPost from "@/domain/shared/components/posts/show";

export default {
  metaInfo: {
    title: "Post",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    showPost
  }
};
</script>

<style scoped>

</style>
