import { defineStore } from 'pinia'
import postApi from '@/domain/post/api/v1/post.api'
import PagedResult from '@/domain/shared/models/common/PagedResult'
import { Post } from '@/domain/post/models/post.model'
import { Pagination } from '@/domain/shared/models/common/Pagination'

export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: [] as Post[],
        pagination: {} as Pagination,
        isLoading: false as Boolean,
    }),
    getters: {},
    actions: {
        async fetchPosts() {
            try {
                this.isLoading = true

                const pagedResult: PagedResult<Post> = await postApi.getPosts()

                this.$patch({
                    posts: pagedResult.items,
                    pagination: pagedResult.pagination,
                })
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        }
    },
})