<template>
<div class="row justify-content-center">
    <div class="col-md-6">
        <h1>Login</h1>
        <b-form @submit.prevent="onSubmit">
        <b-form-group label="E-mail:" label-for="email"
                      :feedback="errors.first('email')"
                      :state="!errors.first('email') ? null : 'invalid'">
          <b-input-group size="lg">
            <div class="input-group-prepend">
              <i class="input-group-text fa fa-envelope" aria-hidden="true"></i>
            </div>
            <b-form-input name="email"
                          ref="email"
                          type="email"
                          v-model.trim="credentials.email"
                          v-validate="{ required: true, email: true }"
                          data-vv-delay="1000"
                          :state="!errors.first('email') ? null : 'invalid'"
                          placeholder="Enter email"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Password:" label-for="password"
                      :feedback="errors.first('password')"
                      :state="!errors.first('password') ? null : 'invalid'">
          <b-input-group size="lg">
            <div class="input-group-prepend">
              <i class="input-group-text fa fa-lock" aria-hidden="true"></i>
            </div>
            <b-form-input name="password"
                          ref="password"
                          type="password"
                          v-model.trim="credentials.password"
                          v-validate="{ required: true, min: 6}"
                          data-vv-delay="1000"
                          :state="!errors.first('password') ? null : 'invalid'"
                          autocomplete="off"
                          placeholder="Enter password"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
          <b-button type="submit" variant="primary"
                    :disabled="isLoading || errors.any() || !isFormValid">
            <span v-if="isLoading"><i class="fa fa-spinner fa-spin fa-fw"></i> Loading...</span>
            <span v-if="!isLoading">Login</span>
          </b-button>
        </b-form>
    </div>
</div>
</template>

<script>
import {
  login,
  setAccessToken,
  setRefreshToken,
  setUser,
  decodeToken
} from "@/service/authService";

export default {
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isLoading: function() {
      return this.$store.getters.isLoading;
    },
    isFormValid: function() {
      return this.credentials.email != "" && this.credentials.password != "";
    }
  },

  methods: {
    onSubmit() {
      this.$Progress.start();
      this.$store
        .dispatch("loginUser", {
          email: this.credentials.email,
          password: this.credentials.password
        })
        .then(response => {
          this.$Progress.finish();
          let accessToken = response.data.data.tokens.accessToken;
          let refreshToken = response.data.data.tokens.refreshToken;
          let user = response.data.data.user;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setUser(JSON.stringify(user));
          this.$router.push({ name: "Dashboard" });
          this.$notify({
            group: "auth",
            type: "success",
            title: "Login successful!",
            text: "You have logged in successfully",
            duration: 3000,
            speed: 500
          });
        })
        .catch(error => {
          this.$Progress.finish();
          this.$notify({
            group: "auth",
            type: "error",
            title: "Login failed!",
            text: "The email address or password you entered is not valid",
            duration: 3000,
            speed: 500
          });
        });
    }
  }
};
</script>

<style scoped>
.circle {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 10px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fff;
  animation: spin 1s infinite linear;
}
</style>
