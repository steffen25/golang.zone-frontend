<template>
  <main class="sm:container sm:mx-auto sm:mt-10">
    <div class="w-full sm:px-6">
      <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

        <header class="font-semibold bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
          Home
        </header>

        <div class="p-3">
          <g-button variant="primary">primary</g-button>
          <g-button variant="secondary">secondary</g-button>
          <g-button variant="success">success</g-button>
          <g-button variant="danger">danger</g-button>
        </div>

      </section>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import GButton from '@/domain/shared/components/Button.vue';

export default defineComponent({
  components: {
    GButton,
  }
})
</script>