import { httpClient } from '@/modules/shared/utils/http-client'
import { Post } from '@/modules/post/models/post.model'
import PagedResult from '@/modules/shared/models/common/PagedResult'
import { AxiosResponse } from 'axios'

class PostApi {
    async getPosts(page: number = 1, perPage: number = 10): Promise<PagedResult<Post>> {
        const response: AxiosResponse = await httpClient.get('posts', {
            params: {
                page: page,
                perpage: perPage,
            }
        })

        return {
            items: response.data.data,
            pagination: response.data.pagination,
        }
    }
}

const postApi: PostApi = new PostApi();
export default postApi;
