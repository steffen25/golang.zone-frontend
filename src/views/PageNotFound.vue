<template>
  <div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 title">
        {{ msg }}<br>
        <router-link :to="{ path: '/' }">Go back to the homepage</router-link>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  data() {
    return {
      msg: "Sorry, we couldn't find what you were looking for :-("
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
