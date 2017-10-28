<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="#">GoLang.Zone</b-navbar-brand>

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
              <router-link active-class="active"
                          class="nav-link"
                          :to="{ name: 'Logout' }"
                          exact>Logout
              </router-link>
            </li>
            <li v-if="isLoggedIn">
                <div class="nav-link">
                  <small v-bind:class="{ 'red': isAdmin }">{{ currentUser.name}}</small>
                </div>
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
  },

  created() {
    console.log("are we logged in? ", this.isLoggedIn);
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
