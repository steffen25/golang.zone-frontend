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

  setup(props) {
    const getVariantClass = () => {
      switch (props.variant) {
        case 'primary':
          return 'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150'
        case 'secondary':
          return 'inline-flex items-center px-4 py-2 bg-gray-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-300 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150'
        case 'success':
          return 'inline-flex items-center px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 active:bg-green-900 focus:outline-none focus:border-green-900 focus:shadow-outline-red transition ease-in-out duration-150'
        case 'danger':
          return 'inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-600 active:bg-red-900 focus:outline-none focus:border-red-900 focus:shadow-outline-red transition ease-in-out duration-150'
      }
    }

    return {
      getVariantClass
    }
  }
})
</script>
