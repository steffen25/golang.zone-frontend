<template>
  <button
      :type="type"
      class="g-btn"
      :class="[
          variant ? `g-btn-${variant}` : 'g-btn-primary',
          outlined && `g-btn-outlined`,
          size && `g-btn-${size}`,
          rounded && 'rounded-full',
          block && 'g-btn-block',
          text && 'g-btn-text'
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
    block: Boolean,
    text: Boolean,
  },

  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>

  @mixin button-variant($color, $background, $border, $hover) {
    @apply bg-#{$background};
    @apply hover:bg-#{$hover};
    @apply active:bg-#{$border};
    @apply focus:outline-none focus:border-#{$border} focus:ring;
    @apply #{$color};
  }


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

    &-block {
      @apply block w-full;
    }

    &-primary {
      @include button-variant(text-white, indigo-900, indigo-700, indigo-600);
    }

    &-primary &-outlined {
      @apply bg-opacity-0 #{!important};
      @apply text-indigo-800;
      @apply hover:bg-indigo-500 hover:text-white hover:border-opacity-100;
      @apply border border-indigo-500;
    }

    &-secondary {
      @include button-variant(text-white, gray-900, gray-700, gray-900);
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
      @include button-variant(text-white, red-500, red-900, red-600);
    }

    &-danger &-outlined {
      @apply bg-opacity-0;
      @apply text-red-800;
      @apply hover:bg-red-500 hover:text-white hover:border-opacity-100;
      @apply border border-red-500;
    }
  }
</style>
