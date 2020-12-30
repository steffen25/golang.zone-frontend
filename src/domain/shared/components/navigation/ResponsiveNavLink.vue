<template>
  <div>
    <button :class="to" class="w-full text-left" v-if="as === 'button'">
      <slot></slot>
    </button>

    <router-link :to="to" v-else>
      <slot></slot>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ResponsiveNavLink",

  props: {
    to: { type: [Object, String] },
    as: { type: String },
  },
})
</script>
