<template>
  <AppLayout>
    <div class="p-6 min-h-screen flex justify-center items-center">
      <div class="w-full max-w-md">
        <form class="mt-8 rounded-lg shadow-xl overflow-hidden bg-white  shadow-xl" @submit.prevent="submit">
          <div class="px-10 py-12">
            <div class="mx-auto mt-6 w-24 border-b-2" />

            <text-input class="mb-6"
                        v-model="form.email"
                        label="Email"
                        type="email"
                        placeholder="Your Email Address"
                        autofocus
                        autocomplete="email"
                        autocapitalize="off"
                        block
            />

            <text-input class="mb-2"
                        v-model="form.password"
                        label="Password"
                        type="password"
                        placeholder="Your Password"
                        autocomplete="current-password"
                        block
            />

            <g-button @click="submit" class="mt-5" size="lg" block>
              Login
            </g-button>

          </div>
        </form>

      </div>
    </div>
  </AppLayout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import AppLayout from '@/modules/shared/components/layout/AppLayout.vue'
import TextInput from '@/modules/shared/components/input/TextInput.vue'
import GButton from '@/modules/shared/components/button/Button.vue'
import { useAuthStore } from '@/modules/user/store/auth.store'

type LoginForm = {
  email: string
  password: string
};

export default defineComponent({
  components: {
    GButton,
    TextInput,
    AppLayout,
  },

  setup() {
    const sending = ref(false)
    const errors = ref([])
    const form = reactive<LoginForm>({ email: '', password: '' })
    const { login } = useAuthStore()

    const submit = () => {
      console.log('login', form)

      login(form.email, form.password)
    }

    return {
      sending,
      form,
      errors,
      submit,
    }
  }
})
</script>