<template>
  <button
      :type="type"
      class="g-btn"
      :class="[
          variant ? `g-btn-${variant}` : 'g-btn-primary',
          outlined && `g-btn-outlined`,
          size && `g-btn-${size}`,
          rounded && 'rounded',
      ]"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

enum Variants {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
}

enum Sizes {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  OneXl = 'xl',
  TwoXl = '2xl',
}

export default defineComponent({
  name: 'g-button',

  props: {
    variant: {
      type: String,
      validator: (value: Variants) => [
          Variants.Primary,
          Variants.Secondary,
          Variants.Success,
          Variants.Danger,
      ].includes(value)
    },
    size: {
      type: String,
      validator: (value: Sizes) => [
        Sizes.Sm,
        Sizes.Md,
        Sizes.Lg,
        Sizes.OneXl,
        Sizes.TwoXl,
      ].includes(value)
    },
    type: { type: String, default: 'button' },
    rounded: Boolean,
    disabled: Boolean,
    outlined: Boolean,
  },

  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
  .g-btn {
    @apply inline-flex items-center tracking-widest border;
    @apply px-4 py-2;
    @apply transition ease-in-out duration-150;
    @apply font-semibold text-xs;

    &-sm {
      @apply text-sm #{!important};
    }

    &-md {
      @apply text-base #{!important};
    }

    &-lg {
      @apply text-lg #{!important};
    }

    &-xl {
      @apply text-xl #{!important};
    }

    &-2xl {
      @apply text-2xl #{!important};
    }

    &-primary {
      @apply bg-indigo-800;
      @apply hover:bg-indigo-700;
      @apply active:bg-indigo-900;
      @apply focus:outline-none focus:border-indigo-900 focus:ring;
      @apply text-white;
    }

    &-primary &-outlined {
      @apply bg-opacity-0 #{!important};
      @apply text-indigo-800;
      @apply hover:bg-indigo-500 hover:text-white hover:border-opacity-100;
      @apply border border-indigo-500;
    }

    &-secondary {
      @apply bg-gray-800;
      @apply hover:bg-gray-700;
      @apply active:bg-gray-900;
      @apply focus:outline-none focus:border-gray-900 focus:ring;
      @apply text-white;
    }

    &-secondary &-outlined {}

    &-success {
      @apply bg-green-500;
      @apply hover:bg-green-600;
      @apply active:bg-green-900;
      @apply focus:outline-none focus:border-green-900 focus:ring;
      @apply text-white;
    }

    &-success &-outlined {
      @apply bg-opacity-0;
      @apply text-green-800;
      @apply hover:bg-green-500 hover:text-white hover:border-opacity-100;
      @apply border border-green-500;
    }

    &-danger {
      @apply bg-red-500;
      @apply hover:bg-red-600;
      @apply active:bg-red-900;
      @apply focus:outline-none focus:border-red-900 focus:ring;
      @apply text-white;
    }

    &-danger &-outlined {
      @apply bg-opacity-0;
      @apply text-red-800;
      @apply hover:bg-red-500 hover:text-white hover:border-opacity-100;
      @apply border border-red-500;
    }
  }
</style>
