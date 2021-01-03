<template>
    <div class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
      <div class="px-4 py-2 mt-2">
        <h2 class="font-bold text-2xl px-2 py-2 text-gray-800 tracking-normal">
          {{ post.title }}
        </h2>

    <p class="text-sm text-gray-700 px-2" v-html="post.body.substring(0, 200) + '...'"></p>

        <div class="flex items-center justify-between mt-2 mx-6">
          <a href="#" class="text-blue-500 text-xs -ml-3 ">Show More</a>
        </div>

        <div class="author flex items-center -ml-3 my-3">
          <h2 class="text-sm tracking-tighter text-gray-900">
            <a href="#">By {{ post.author }}</a>
            <span class="text-gray-600">{{ post.createdAt }}</span>
          </h2>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable no-unused-vars */
import { Post } from '@/modules/post/models/post.model'
import { PropType, defineComponent } from 'vue'
/* eslint-enable no-unused-vars */

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
})
</script>