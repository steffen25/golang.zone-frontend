<template>
  <main class="sm:container sm:mx-auto sm:mt-10">
    <div class="w-full sm:px-6">
      <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

        <header class="font-semibold bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
          Home
        </header>

        <div class="p-3">
          <div v-for="(buttonVariant, index) in buttonVariants" :key="index" class="mb-4">
            <g-button v-for="buttonProp in buttonProps" :key="buttonProp.size"
                      class="ml-1"
                      :variant="buttonVariant"
                      :outlined="buttonProp.outlined"
                      :rounded="buttonProp.rounded"
                      :disabled="buttonProp.disabled"
                      :size="buttonProp.size"
                      :block="buttonProp.block"
                      :text="buttonProp.text"
            >
              {{ buttonVariant }} ({{ buttonProp.size }})
            </g-button>
          </div>
        </div>

      </section>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import GButton from '@/modules/shared/components/button/Button.vue';

export default defineComponent({
  components: {
    GButton,
  },

  setup() {
    const buttonVariants = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
    ];

    const buttonProps = [
      {
        size: 'sm',
        outlined: true,
        rounded: false,
        disabled: false,
        block: false,
        text: true,
      },
        {
          size: 'sm',
          outlined: true,
          rounded: true,
          disabled: false,
          block: false,
          text: false,
        },
        {
          size: 'md',
          outlined: false,
          rounded: false,
          disabled: false,
          block: false,
          text: false,
        },
        {
          size: 'lg',
          outlined: false,
          rounded: false,
          disabled: false,
          block: false,
          text: false,
        },
        {
          size: '2xl',
          outlined: false,
          rounded: false,
          disabled: false,
          block: false,
          text: false,
        },
    ]

    return {
      buttonVariants,
      buttonProps
    }
  }
})
</script>