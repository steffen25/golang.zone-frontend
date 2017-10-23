<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar>
            <router-link active-class="active"
                         class="nav-link"
                         :to="{ name: 'HomePage'}"
                         exact>Home
            </router-link>
          <router-link active-class="active"
                       class="nav-link"
                       :to="{ name: 'PostsPage'}"
                       exact>Posts
          </router-link>
        </b-nav>

      </b-collapse>

    </b-container>
  </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
