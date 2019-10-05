<template>
<div class="row">
  <div class="col-md-8">
    <br>
    <div v-if="loading" class="text-center">Loading...</div>
    <div class="row">
    <div class="col-lg-2 ml-auto">
      <b-form-select size="lg"
                     v-model="selected"
                     :options="options"
                     class="mb-3"
                     ></b-form-select>
    </div>
    </div>
    <div v-if="posts && posts.length" class="mb-4">
            <b-card v-for="post of posts" :key="post.id"
              footer-tag="footer"
              tag="article"
              class="mb-4 card">
                <div>
                  <h4 class="card-title update-post">{{ post.title | capitalizeTitle }}</h4>
                  <router-link v-if="isLoggedIn && currentUser.admin" :to="{ name: 'update.post', params: { slug: post.slug }}">
                    <i @click="getCurrentPost(post)" class="fa fa-pencil fa-fw update-post-icon" aria-hidden="true"></i>
                  </router-link>
                </div>
        <p v-html="$options.filters.test(post.body)" class="card-text">
          {{ post.body }}
        </p>
        <router-link :to="{ name: 'show.post', params: { slug: post.slug }}">
          <b-button @click="getCurrentPost(post)" variant="primary">Read More →</b-button>
        </router-link>
        <span slot="footer" class="text-muted">
                Posted on {{ post.createdAt | postedOn }}
                by <router-link :to="{ path: '/@' + post.userId }">{{ post.author }}
                </router-link>
                </span>
      </b-card>
    </div>

    <div class="mb-4">
      <div class="row">
        <div class="col-4">
          <router-link :to="{ name: 'index.posts', params: { page: pagination.currentPage - 1 }}">
            <button class="btn btn-default paginateBtn float-left"
                    :disabled="!pagination.prevPageUrl">
                    « Previous
            </button>
          </router-link>
        </div>
        <div class="col-4 text-center">
          <span style="vertical-align: -webkit-baseline-middle">Page {{ pagination.currentPage }} of {{ pagination.lastPage }}</span>
        </div>
        <div class="col-4">
          <router-link :to="{ name: 'index.posts', params: {page: pagination.currentPage + 1}}">
            <button class="btn btn-default paginateBtn float-right"
                    :disabled="!pagination.nextPageUrl">
                    Next »
            </button>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { api } from '@/Api'
import moment from 'moment'

export default {
	name: 'Posts',
	props: ['perPage'],
	data () {
		return {
			pagination: {
				currentPage: 1, // current page (it will be automatically updated when users clicks on some page number).
				total: 0 // total number of posts
			},
			offset: 4, // left and right padding from the pagination <span>,just change it to see effects
			posts: [],
			loading: false,
			selected: 10,
			options: [
				{ value: 10, text: '10' },
				{ value: 25, text: '25' },
				{ value: 50, text: '50' },
				{ value: 75, text: '75' },
				{ value: 100, text: '100' }
			]
		}
	},

	created () {
		const page = parseInt(this.$route.params.page, 10)
		var pageParam = null
		if (this.$route.params.page === undefined) {
			pageParam = 1
		} else {
			pageParam = page
		}
		this.getPosts(pageParam).then(() => {
			if (pageParam > this.pagination.lastPage) {
				this.$router.push({ name: 'index.posts' })
			}
		})
	},

	computed: {
		isLoggedIn: function () {
			return this.$store.getters.isLoggedIn
		},
		currentUser: function () {
			return this.$store.getters.getUser
		}
	},

	watch: {
		selected: function (val, oldVal) {
			this.getPosts(this.pagination.currentPage, val)
		},
		$route (to, from) {
			if (from.params.page !== to.params.page) {
				return this.getPosts(to.params.page)
			}
		}
	},

	methods: {
		getCurrentPost (post) {
			this.$store.dispatch('setPost', post)
		},
		getPosts (page, perPage = 10) {
			this.$Progress.start()
			this.loading = true
			return new Promise((resolve, reject) => {
				api
					.get('posts', {
						params: {
							page: page,
							perpage: perPage
						}
					})
					.then(response => {
						this.$Progress.finish()
						this.loading = false
						this.pagination = response.data.pagination
						this.posts = response.data.data
						resolve()
					})
					.catch(error => {
						this.$Progress.finish()
						this.loading = false
						this.$router.replace('/page-not-found')
						reject(error)
					})
			})
		},
		nextPage () {
			const page = parseInt(this.$route.params.page, 10)
			if (page < this.pagination.total / this.pagination.perPage) {
				const nextPage = page + 1
				this.$router.push(`/posts/${nextPage}`)
			}
		},
		previousPage () {
			const page = parseInt(this.$route.params.page, 10)
			if (page > 1) {
				const previousPage = page - 1
				this.$router.push(`/posts/${previousPage}`)
			}
		}
	},

	filters: {
		test (value) {
			return value.substring(0, 200) + '...'
		},
		postedOn (value) {
			let date = moment(value)
			let now = moment()
			let diffInDays = date.from(now)
			let diffInYears = now.diff(date, 'years')
			if (diffInYears !== 0) {
				return date.format('MMMM Do YYYY')
			}
			if (diffInDays === 'a day ago') {
				return 'Yesterday'
			} else if (diffInDays === '2 days ago') {
				return 'Day Before Yesterday'
			}
			return date.format('MMMM Do')
		},
		capitalizeTitle (value) {
			return value
				.toLowerCase()
				.split(' ')
				.map(function (word) {
					return word[0].toUpperCase() + word.substr(1)
				})
				.join(' ')
		},
		atUsername (value) {
			return '@' + value
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.update-post {
  display: inline-block;
}
.update-post-icon {
  color: #c9c9c9;
}
.update-post-icon:hover {
  color: #333;
}
.paginateBtn {
  cursor: pointer;
}
</style>
