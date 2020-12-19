import { httpClient } from '@/domain/shared/utils/http-client'
import { Post } from '@/domain/post/models/post.model'
import PagedResult from '@/domain/shared/models/common/PagedResult'
import { AxiosResponse } from 'axios'

class PostApi {
    async getPosts(): Promise<PagedResult<Post>> {
        const response: AxiosResponse = await httpClient.get('posts')

        return {
            items: response.data.data,
            pagination: response.data.pagination,
        }
    }
}

const postApi: PostApi = new PostApi();
export default postApi;
