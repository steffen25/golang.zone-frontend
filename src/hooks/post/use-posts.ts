import { reactive, toRefs } from 'vue';
import { Post } from "@/models/post";
import { postService } from '@/services'
import Pagination from "@/models/common/Pagination";
import PagedResult from "@/models/common/PagedResult";

interface State {
    posts: Post[]
    pagination?: Pagination
}

const state = reactive<State>({
    posts: [],
    pagination: undefined
})

export const usePosts = () => {
    async function fetchPosts() {
        const pagedResult: PagedResult<Post> = await postService.getPosts()

        state.posts = pagedResult.items
        state.pagination = pagedResult.pagination
    }

    return {
        fetchPosts,
        ...toRefs<State>(state),
    }
}