<template>
<b-container>
    <show-profile />
</b-container>
</template>

<script>
import showProfile from "@/domain/shared/components/user/show";

export default {
  metaInfo: {
    title: "Profile",
    titleTemplate: '%s - Golang.Zone'
  },
  components: {
    showProfile
  }
};
</script>

<style scoped>

</style>
