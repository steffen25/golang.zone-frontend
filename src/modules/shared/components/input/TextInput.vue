<template>
  <input class="form-input rounded-md shadow-sm"
         :class="[
             block && 'block w-full',
         ]"
         v-model="value"
         v-bind="$attrs"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useModelWrapper } from '@/modules/shared/utils/model-wrapper'

export default defineComponent({
  name: 'TextInput',

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    block: Boolean,
  },

  setup(props, { emit }) {
    return {
      value: useModelWrapper(props, emit, 'modelValue')
    }
  }
})
</script>