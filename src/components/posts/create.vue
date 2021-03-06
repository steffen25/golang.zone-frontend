<template>
    <b-container>
        <div class="row">
            <div class="col-md-12">
                <h1>Create Post</h1>

        <b-form @submit.prevent="onSubmit">
        <b-form-group label="Title:" label-for="title"
                      :feedback="errors.first('title')"
                      :state="!errors.first('title') ? null : false">
          <b-input-group size="lg">
            <div class="input-group-prepend">
              <i class="input-group-text fa fa-header" aria-hidden="true"></i>
            </div>
            <b-form-input name="title"
                          ref="title"
                          type="text"
                          v-model.trim="post.title"
                          v-validate="{ required: true, min: 3 }"
                          data-vv-delay="1000"
                          :state="!errors.first('title') ? null : false"
                          placeholder="Enter post title"
                          :disabled="isLoading"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Body:" label-for="body"
                      :feedback="errors.first('body')"
                      :state="!errors.first('body') ? null : false"
        >
            <vue-editor v-model="post.body"
                        v-validate="{ required: true, min: 10, max: 1000 }"
                        :disabled="isLoading"
            ></vue-editor>

        </b-form-group>

          <b-button type="submit" variant="primary"
                    :disabled="isLoading || errors.any() || !isFormValid">
            <span v-if="isLoading"><i class="fa fa-spinner fa-spin fa-fw"></i> Loading...</span>
            <span v-if="!isLoading">Create Post</span>
          </b-button>

        </b-form>
        </div>
    </div>
</b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { isAdmin } from '@/service/authService'

export default {
	name: 'PostCreate',
	components: {
		VueEditor
	},
	data () {
		return {
			post: {
				title: '',
				body: ''
			}
		}
	},

	created () {
		if (!isAdmin) this.$router.push({ name: 'index.posts' })
	},

	computed: {
		isLoading: function () {
			return this.$store.getters.isLoading
		},
		isFormValid: function () {
			return this.post.title !== '' && this.post.body !== ''
		},
		isAdmin: function () {
			return isAdmin()
		}
	},

	methods: {
		onSubmit () {
			this.$Progress.start()
			this.$store
				.dispatch('createPost', {
					title: this.post.title,
					body: this.post.body
				})
				.then(response => {
					this.$Progress.finish()
					this.$router.push({
						name: 'show.post',
						params: { slug: response.data.data.slug }
					})
					this.$notify({
						group: 'auth',
						type: 'success',
						title: 'Post successful!',
						text: 'Post was successfully created.',
						duration: 3000,
						speed: 500
					})
				})
				.catch(() => {
					this.$Progress.finish()
					this.$notify({
						group: 'auth',
						type: 'error',
						title: 'Post failed!',
						text: 'Could not create post.',
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
