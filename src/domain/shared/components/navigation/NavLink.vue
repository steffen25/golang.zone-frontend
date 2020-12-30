<template>
  <router-link :to="to" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
    <slot></slot>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "NavLink",

  props: {
    to: { type: [Object, String] },
  },
})
</script>