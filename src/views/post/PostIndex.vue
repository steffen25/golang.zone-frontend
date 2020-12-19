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

      <div v-if="pagination" class="grid grid-cols-3 gap-4 pb-5">
        <div class="text-left">
          <button @click.prevent="previousPage" :disabled="!pagination.prevPageUrl">
            « Previous
          </button>
        </div>
        <div class="text-center">
          {{ pagination.currentPage }} of {{ pagination.lastPage }}
        </div>
        <div class="text-right">
            <button @click.prevent="nextPage" :disabled="!pagination.nextPageUrl">
              Next »
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