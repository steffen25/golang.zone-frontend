<template>
  <div class="relative">
    <div @click="open = ! open">
      <slot name="trigger"></slot>
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <div v-show="open" class="fixed inset-0 z-40" @click="open = false"></div>

    <transition
        enter-active-class="transition ease-out duration-200"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95">
      <div v-show="open"
           class="absolute z-50 mt-2 rounded-md shadow-lg"
           :class="[widthClass, alignmentClasses]"
           style="display: none;"
           @click="open = false">
        <div class="rounded-md shadow-xs" :class="contentClasses">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: "Dropdown",

  props: {
    align: {
      default: 'right'
    },
    width: {
      default: '48'
    },
    contentClasses: {
      default: () => ['py-1', 'bg-white']
    }
  },

  setup(props) {
    const open = ref(false)

    const closeOnEscape = (e: KeyboardEvent) => {
      if (open.value && e.key === 'Escape') {
        open.value = false
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', closeOnEscape)
    })

    document.addEventListener('keydown', closeOnEscape)

    const widthClass = computed(() => {
      return 'w-48'
    })

    const alignmentClasses = computed(() => {
      if (props.align === 'left') {
        return 'origin-top-left left-0'
      } else if (props.align === 'right') {
        return 'origin-top-right right-0'
      } else {
        return 'origin-top'
      }
    })

    return {
      open,
      widthClass,
      alignmentClasses,
    }
  }
})
</script>
