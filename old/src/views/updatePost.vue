<template>
    <b-container>
      <br>
        <update-post />
    </b-container>
</template>

<script>
import updatePost from "@/domain/shared/components/posts/update";

export default {
  metaInfo: {
    title: "Edit Post",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    updatePost
  }
};
</script>

<style scoped>

</style>
