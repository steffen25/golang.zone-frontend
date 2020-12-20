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

  $button-variants: (
      (
          "variant": "primary",
          "color": text-white,
          "background": indigo-900,
          "border": indigo-700,
          "hover": indigo-600,
      ),
      (
          "variant": "secondary",
          "color": text-white,
          "background": gray-900,
          "border": gray-700,
          "hover": gray-600,
      ),
      (
          "variant": "success",
          "color": text-white,
          "background": green-500,
          "border": green-900,
          "hover": green-600,
      ),
      (
          "variant": "danger",
          "color": text-white,
          "background": red-500,
          "border": red-900,
          "hover": red-600,
      ),
  );

  @mixin button-variant($color, $background, $border, $hover) {
    @apply bg-#{$background};
    @apply hover:bg-#{$hover};
    @apply active:bg-#{$border};
    @apply focus:outline-none focus:border-#{$border} focus:ring;
    @apply #{$color};
  }

  $text-sizes: sm, md, lg, xl, 2xl;

  .g-btn {
    @apply inline-flex items-center tracking-widest border;
    @apply px-4 py-2;
    @apply transition ease-in-out duration-150;
    @apply font-semibold text-xs;

    @each $text-size in $text-sizes {
      @if $text-size == 'md' {
        &-#{$text-size} {
          @apply text-base;
        }
      } @else {
        &-#{$text-size} {
          @apply text-#{$text-size}
        }
      }
    }

    @each $button-variant in $button-variants {
      $variant: map-get($button-variant, "variant");
      $color: map-get($button-variant, "color");
      $background: map-get($button-variant, "background");
      $border: map-get($button-variant, "border");
      $hover: map-get($button-variant, "hover");

      &-#{$variant} {
        @include button-variant($color, $background, $border, $hover);
      }
    }

    &-block {
      @apply block w-full;
    }

    &-primary &-outlined {
      @apply bg-opacity-0 #{!important};
      @apply text-indigo-800;
      @apply hover:bg-indigo-500 hover:text-white hover:border-opacity-100;
      @apply border border-indigo-500;
    }

    &-secondary &-outlined {}

    &-success &-outlined {
      @apply bg-opacity-0;
      @apply text-green-800;
      @apply hover:bg-green-500 hover:text-white hover:border-opacity-100;
      @apply border border-green-500;
    }

    &-danger &-outlined {
      @apply bg-opacity-0;
      @apply text-red-800;
      @apply hover:bg-red-500 hover:text-white hover:border-opacity-100;
      @apply border border-red-500;
    }
  }
</style>
