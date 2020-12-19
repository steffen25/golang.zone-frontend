<template>
  <main class="sm:container sm:mx-auto sm:mt-10">
    <div class="w-full sm:px-6">
      <section class="flex flex-cols">
        <div v-if="posts" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
        </div>
      </section>

      <div v-if="pagination" class="grid grid-cols-3 gap-4">
        <div class="col-start-2">
          <button
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              @click="nextPage"
          >
            next
          </button>
        </div>
        <div>
          {{ pagination.currentPage }} of {{ pagination.lastPage }}
        </div>
        <div class="col-end-2">
          <button
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              @click="previousPage"
          >
            previous
          </button>
        </div>
      </div>

    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import PostCard from '@/domain/post/components/PostCard.vue'
import { usePostStore } from "@/domain/post/store/post.store";
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PostCard,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const postStore = usePostStore()
    const isLoading = computed(() => postStore.isLoading)
    const posts = computed(() => postStore.posts)
    const pagination = computed(() => postStore.pagination)
    const currentPage = computed(() => route.query.page ? Number.parseInt(route.query.page as string, 10) : 1)

    postStore.fetchPosts(currentPage.value)

    const previousPage = () => {
      if (currentPage.value > 1) {
        const previousPage = currentPage.value - 1
        postStore.fetchPosts(previousPage)
        router.push({ name: 'post.index', query: { page: previousPage }})
      }
    }

    const nextPage = () => {
      if (currentPage.value < pagination.value.total / pagination.value.perPage) {
        const nextPage = currentPage.value + 1;
        postStore.fetchPosts(nextPage)
        router.push({ name: 'post.index', query: { page: nextPage } })
      }
    }

    return {
      isLoading,
      posts,
      pagination,
      nextPage,
      previousPage,
    }
  }
})
</script>