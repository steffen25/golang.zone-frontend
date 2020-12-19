<template>
  <main class="sm:container sm:mx-auto sm:mt-10">
    <div class="w-full sm:px-6">


      <div class="flex items-center justify-end">
        <div class="relative inline-block text-left">
          <Menu>
        <span class="rounded-md shadow-sm">
          <MenuButton
              class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          >
            <span>Per page {{ selectedPerPageOption }}</span>
            <svg
                class="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
              ></path>
            </svg>
          </MenuButton>
        </span>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                  class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              >

                <div class="py-1" v-for="perPageOption in perPageOptions" :key="perPageOption">
                  <MenuItem>
                    <a
                        @click="setSelectedPerPage(perPageOption)"
                        :class="perPageOption === selectedPerPageOptions ? 'bg-gray-100 text-gray-900' : 'text-gray-700'"
                        class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    >
                      {{ perPageOption }}
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <section class="flex flex-cols">
        <div v-if="posts" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
        </div>
      </section>

      <div v-if="pagination" class="grid grid-cols-3 gap-4">
        <div class="col-start-2">
          <button
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              @click="nextPage"
          >
            next
          </button>
        </div>
        <div>
          {{ pagination.currentPage }} of {{ pagination.lastPage }}
        </div>
        <div class="col-end-2">
          <button
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              @click="previousPage"
          >
            previous
          </button>
        </div>
      </div>

    </div>
  </main>
</template>
<script lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { defineComponent, computed } from 'vue'
import PostCard from '@/domain/post/components/PostCard.vue'
import { usePostStore } from "@/domain/post/store/post.store";
import { useRoute, useRouter } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import {PerPageOption} from "@/domain/shared/models/common/Pagination";

export default defineComponent({
  components: {
    PostCard,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const postStore = usePostStore()
    const isLoading = computed(() => postStore.isLoading)
    const posts = computed(() => postStore.posts)
    const pagination = computed(() => postStore.pagination)
    const currentPage = computed(() => route.query.page ? Number.parseInt(route.query.page as string, 10) : 1)
    const perPageOptions = postStore.perPageOptions
    const selectedPerPageOption = computed(() => route.query.perPage && PerPageOption[Number.parseInt(route.query.perPage as string, 10)]
        ? Number.parseInt(route.query.perPage as string, 10)
        : postStore.selectedPerPageOption)

    postStore.fetchPosts(currentPage.value)

    const previousPage = () => {
      if (currentPage.value > 1) {
        const previousPage = currentPage.value - 1
        postStore.fetchPosts(previousPage, selectedPerPageOption.value)
        router.push({ name: 'post.index', query: { page: previousPage, perPage: selectedPerPageOption.value }})
      }
    }

    const nextPage = () => {
      if (currentPage.value < pagination.value.total / pagination.value.perPage) {
        const nextPage = currentPage.value + 1;
        postStore.fetchPosts(nextPage, selectedPerPageOption.value)
        router.push({ name: 'post.index', query: { page: nextPage, perPage: selectedPerPageOption.value } })
      }
    }

    const setSelectedPerPage = (option: PerPageOption) => {
      postStore.setSelectedPerPageOption(option)
      postStore.fetchPosts(1, option)
      router.push({ name: 'post.index', query: { page: 1, perPage: option } })
    }

    return {
      isLoading,
      posts,
      pagination,
      nextPage,
      previousPage,
      perPageOptions,
      selectedPerPageOption,
      setSelectedPerPage
    }
  }
})
</script>