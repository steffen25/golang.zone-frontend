<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import DefaultLayout from "@/views/layouts/DefaultLayout.vue";

@Options({
  components: {
    DefaultLayout,
  },
})

export default class App extends Vue {}
</script>
<style lang="scss">
  @import './styles/tailwind.scss';
</style>
