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
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import PostCard from '@/domain/post/components/PostCard.vue'
import { usePostStore } from "@/domain/post/store/post.store";

export default defineComponent({
  components: {
    PostCard,
  },

  setup() {
    const postStore = usePostStore()
    const isLoading = computed(() => postStore.isLoading)
    const posts = computed(() => postStore.posts)
    const pagination = computed(() => postStore.pagination)

    postStore.fetchPosts()

    return {
      isLoading,
      posts,
      pagination,
    }
  }
})
</script>