<template>
  <button
      :type="type"
      class="g-btn"
      :class="[
          variant ? `g-btn--${variant}` : 'g-btn--primary'
      ]"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'g-button',

  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'danger'].includes(value)
    },
    type: {
      type: String,
      default: 'submit',
    },
  },

  setup() {

    return {}
  }
})
</script>
<style lang="scss" scoped>
  .g-btn {
    @apply inline-flex items-center rounded-md tracking-widest border;
    @apply px-4 py-2;
    @apply transition ease-in-out duration-150;

    &--primary {
      @apply bg-gray-800;
      @apply hover:bg-gray-700;
      @apply active:bg-gray-900;
      @apply focus:outline-none focus:border-gray-900 focus:ring;
      @apply font-semibold text-xs text-white uppercase;
    }

    &--secondary {
      @apply bg-gray-800;
      @apply hover:bg-gray-700;
      @apply active:bg-gray-900;
      @apply focus:outline-none focus:border-gray-900 focus:ring;
      @apply font-semibold text-xs text-white uppercase;
    }

    &--success {
      @apply bg-green-500;
      @apply hover:bg-green-600;
      @apply active:bg-green-900;
      @apply focus:outline-none focus:border-green-900 focus:ring;
      @apply font-semibold text-xs text-white uppercase;
    }

    &--danger {
      @apply bg-red-500;
      @apply hover:bg-red-600;
      @apply active:bg-red-900;
      @apply focus:outline-none focus:border-red-900 focus:ring;
      @apply font-semibold text-xs text-white uppercase;
    }
  }
</style>
