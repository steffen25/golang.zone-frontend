import { httpClient } from '@/utils/http-client'
import { Post } from "@/models/post";
import PagedResult from "@/models/common/PagedResult";
import { AxiosResponse } from "axios";

class PostService {
    async getPosts(): Promise<PagedResult<Post>> {
        const response: AxiosResponse = await httpClient.get('posts')
        const posts: PagedResult<Post> = {
            items: response.data.data,
            pagination: response.data.pagination,
        }

        return posts
    }
}

const postService: PostService = new PostService();
export default postService;
