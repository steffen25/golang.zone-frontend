import { Pagination } from '@/modules/shared/models/common/Pagination'

export default class PagedResult<T> {
    pagination?: Pagination
    items: Array<T> = []
}