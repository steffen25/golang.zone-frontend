<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Headr></Headr>
    <notifications group="auth" />
    <notifications group="post" />
    <notifications group="editor" />
    <transition name="fade">
      <router-view/>
    </transition>
    <Footr></Footr>
  </div>
</template>

<script>
import Headr from "./components/layout/Header"
import Footr from "./components/layout/Footer"

export default {
  name: "App",
  components: {
    Headr,
    Footr
  }
}
</script>

<style>
.vue-notification {
  margin-top: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
