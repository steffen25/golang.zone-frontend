<template>
  <div class="min-h-screen bg-gray-200">
    <nav :class="[ !$slots['header'] ? 'shadow' : '' ]" class="bg-white border-b border-gray-200">
      <!-- Primary Navigation Menu -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/">Logo</router-link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <g-nav-link to="/">Home</g-nav-link>
              <g-nav-link to="/posts">Posts</g-nav-link>
            </div>
          </div>

          <!-- Settings Dropdown -->
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="ml-3 relative">
              <g-dropdown align="right" width="48">
                <template #trigger>
                  <button class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                    <div>Name</div>

                    <div class="ml-1">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </template>

                <template #content>
                  <g-dropdown-link href="/">Profile</g-dropdown-link>

                  <div class="border-t border-gray-200"></div>

                  <!-- Authentication -->
                  <form @submit.prevent="logout">
                    <g-dropdown-link as="button">Logout</g-dropdown-link>
                  </form>
                </template>
              </g-dropdown>
            </div>
          </div>

          <!-- Hamburger -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button @click="showingNavigationDropdown = ! showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Responsive Navigation Menu -->
      <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <g-responsive-nav-link to="/">Home</g-responsive-nav-link>
          <g-responsive-nav-link to="/">Posts</g-responsive-nav-link>
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="ml-3">
              <div class="font-medium text-base text-gray-800">username</div>
              <div class="font-medium text-sm text-gray-500">email</div>
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <g-responsive-nav-link to="/">Profile</g-responsive-nav-link>

            <!-- Authentication -->
            <form method="POST" @submit.prevent="logout">
              <g-responsive-nav-link as="button">Logout</g-responsive-nav-link>
            </form>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Heading -->
    <header v-if="$slots['header']" class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header"></slot>
      </div>
    </header>

    <!-- Page Content -->
    <main>
      <slot></slot>
    </main>

    <!-- Modal Portal -->
<!--    <teleport name="modal" multiple></teleport>-->

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import GDropdown from '@/modules/shared/components/dropdown/Dropdown.vue'
import GDropdownLink from '@/modules/shared/components/dropdown/DropdownLink.vue'
import GNavLink from '@/modules/shared/components/navigation/NavLink.vue'
import GResponsiveNavLink from '@/modules/shared/components/navigation/ResponsiveNavLink.vue'

export default defineComponent({
  name: "AppLayout",

  components: {
    GNavLink,
    GDropdown,
    GDropdownLink,
    GResponsiveNavLink,
  },

  setup() {
    const showingNavigationDropdown = ref(false)

    const logout = () => {
      console.log('logout')
    }

    return {
      showingNavigationDropdown,
      logout,
    }
  },
})
</script>