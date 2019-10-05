<template>
<div class="row justify-content-center">
    <div class="col-md-6">
        <h1>Register</h1>
        <b-form @submit.prevent="onSubmit">
        <b-form-group label="Full Name:" label-for="fullName"
                      :feedback="errors.first('full_name')"
                      :state="!errors.first('full_name') ? null : false">
          <b-input-group size="lg">
            <div class="input-group-prepend">
              <i class="input-group-text fa fa-user" aria-hidden="true"></i>
            </div>
            <b-form-input name="full_name"
                          ref="full_name"
                          type="text"
                          data-vv-as="full name"
                          v-model.trim="credentials.name"
                          v-validate="{ required: true, min: 2 }"
                          data-vv-delay="1000"
                          :state="!errors.first('full_name') ? null : false"
                          placeholder="Enter full name"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="E-mail:" label-for="email"
                      :feedback="errors.first('email')"
                      :state="!errors.first('email') ? null : false">
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
                          :state="!errors.first('email') ? null : false"
                          placeholder="Enter email"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Password:" label-for="password"
                      :feedback="errors.first('password')"
                      :state="!errors.first('password') ? null : false">
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
                          :state="!errors.first('password') ? null : false"
                          autocomplete="off"
                          placeholder="Enter password"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Confirm Password:" label-for="confirmPassword"
                      :feedback="errors.first('confirm_password')"
                      :state="!errors.first('confirm_password') ? null : false">
          <b-input-group size="lg">
            <div class="input-group-prepend">
              <i class="input-group-text fa fa-lock" aria-hidden="true"></i>
            </div>
            <b-form-input name="confirm_password"
                          ref="confirm_password"
                          type="password"
                          v-model.trim="credentials.confirm_password"
                          data-vv-as="confirm password"
                          v-validate="{ required: true, min: 6, confirmed: 'password'}"
                          :state="!errors.first('confirm_password') ? null : false"
                          data-vv-delay="1000"
                          autocomplete="off"
                          placeholder="Confirm password"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
          <b-button type="submit" variant="primary"
                    :disabled="isLoading || errors.any() || !isFormValid">
            <span v-if="isLoading"><i class="fa fa-spinner fa-spin fa-fw"></i> Loading...</span>
            <span v-if="!isLoading">Register</span>
          </b-button>
        </b-form>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
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
      return (
        this.credentials.email != "" &&
        this.credentials.password != "" &&
        this.credentials.name != "" &&
        this.credentials.confirm_password != ""
      );
    }
  },

  methods: {
    onSubmit() {
      this.$Progress.start();
      this.$store
        .dispatch("registerUser", {
          name: this.credentials.name,
          email: this.credentials.email,
          password: this.credentials.password
        })
        .then(response => {
          this.$Progress.finish();
          this.$router.push({ name: "Login" });
          this.$notify({
            group: "auth",
            type: "success",
            title: "Register successful!",
            text: "Register successfully you can now login.",
            duration: 3000,
            speed: 500
          });
        })
        .catch(error => {
          this.$Progress.finish();
          this.$notify({
            group: "auth",
            type: "error",
            title: "Register failed!",
            text: "Register failed please try again.",
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
