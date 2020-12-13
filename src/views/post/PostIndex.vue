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
import PostCard from '@/components/post/PostCard'
import { usePosts } from '@/hooks/post/use-posts'

export default {
  components: {
    PostCard,
  },

  setup() {
    const { fetchPosts, posts, pagination } = usePosts()

    fetchPosts()

    return {
      posts,
      pagination,
    }
  }
}
</script>