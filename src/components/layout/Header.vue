<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <a href="/">
        <img style="height: 50px;" class="mr-2" src="/static/logo.svg" alt="Golang.Zone" />
      </a>
      <b-navbar-brand href="/">
        GoLang.Zone
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <ul class="nav navbar-nav">
          <li>
            <router-link active-class="active"
                         class="nav-link"
                         :to="{ name: 'Home' }"
                         exact>Home
            </router-link>
          </li>
          <li>
            <router-link active-class="active"
                        class="nav-link"
                        :to="{ name: 'index.posts' }"
                        exact>Posts
            </router-link>
          </li>
          <li v-if="isLoggedIn && isAdmin">
            <router-link active-class="active"
                        class="nav-link"
                        :to="{ name: 'create.post' }"
                        exact>Create Post
            </router-link>
          </li>
        </ul>

          <ul class="nav navbar-nav ml-auto">
            <li v-if="!isLoggedIn">
              <router-link active-class="active"
                          class="nav-link"
                          :to="{ name: 'Login' }"
                          exact>Login
              </router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link active-class="active"
                          class="nav-link"
                          :to="{ name: 'Register' }"
                          exact>Register
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <b-nav-item-dropdown :text="currentUser.name" right>
                <template slot="button-content">
                  <b v-bind:class="{ 'red': isAdmin }">{{ currentUser.name }}</b>
                </template>
                <b-dropdown-item href="/logout">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
            </li>
          </ul>

        </b-nav>

      </b-collapse>

    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {};
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser: function() {
      return this.$store.getters.getUser;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red {
  color: #cb4335;
  font-weight: bold;
  font-size: 14px;
}
</style>
