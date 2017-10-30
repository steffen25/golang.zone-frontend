<template>
    <b-container>
        <div class="row">
            <div class="col-md-12">
                <h1>Edit Post</h1>
        <b-form @submit.prevent="onSubmit">
        <b-form-group label="Title:" label-for="title" 
                      :feedback="errors.first('title')"
                      :state="!errors.first('title') ? null : 'invalid'">
          <b-input-group size="lg">
             <i class="input-group-addon fa fa-header" aria-hidden="true"></i>
            <b-form-input name="title"
                          ref="title"
                          type="text"
                          v-model="post.title"
                          v-validate="{ required: true }"
                          data-vv-delay="1000"
                          :state="!errors.first('title') ? null : 'invalid'"
                          placeholder="Enter post title"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Body:" label-for="body"
                      :feedback="errors.first('body')"
                      :state="!errors.first('body') ? null : 'invalid'">
          <b-input-group size="lg">
            <vue-editor v-model="post.body"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded"
                        :disabled="isLoading"
            ></vue-editor>
          </b-input-group>
        </b-form-group>
          <b-button type="submit" variant="primary" 
                    :disabled="isLoading || errors.any() || !isFormValid">
            <span v-if="isLoading"><i class="fa fa-spinner fa-spin fa-fw"></i> Loading...</span>
            <span v-if="!isLoading">Update Post</span>
          </b-button>
        </b-form>
        </div>
    </div>
</b-container>
</template>

<script>
import { isAdmin } from "@/service/authService"
import { VueEditor } from "vue2-editor"
import FormData from "form-data"
import api from "../../service/api"
import moment from "moment"

export default {
  name: "PostUpdate",
  components: {
    VueEditor
  },
  data() {
    return {
      post: {
        id: this.$store.state.posts.post.id,
        title: this.$store.state.posts.post.title,
        body: this.$store.state.posts.post.body
      }
    }
  },

  created() {
    if (!isAdmin) this.$router.push({ name: "index.posts" })
  },

  computed: {
    isLoading: function() {
      return this.$store.getters.isLoading
    },
    isFormValid: function() {
      return this.post.title != "" && this.post.body != ""
    },
    isAdmin: function() {
      return isAdmin()
    }
  },

  methods: {
    handleImageAdded: (file, Editor, cursorLocation) => {
      let formData = new FormData()
      formData.append("image", file)
      api
        .post("images/upload", formData)
        .then(result => {
          let url = result.data.data.imageUrl
          Editor.insertEmbed(cursorLocation, "image", url)
        })
        .catch(error => {
          // TODO: error handling
          console.log(error)
        })
    },
    onSubmit() {
      this.$Progress.start()
      this.$store
        .dispatch("updatePost", {
          id: this.post.id,
          title: this.post.title,
          body: this.post.body
        })
        .then(response => {
          this.$Progress.finish()
          this.$router.push({
            name: "show.post",
            params: { slug: response.data.data.slug }
          })
          this.$notify({
            group: "auth",
            type: "success",
            title: "Post successful!",
            text: "Post was successfully updated.",
            duration: 3000,
            speed: 500
          })
        })
        .catch(error => {
          this.$Progress.finish()
          this.$notify({
            group: "auth",
            type: "error",
            title: "Post update failed!",
            text: "Could not update post.",
            duration: 3000,
            speed: 500
          })
        })
    }
  }
}
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