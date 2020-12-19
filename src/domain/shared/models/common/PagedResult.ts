import { Pagination } from "@/domain/shared/models/common/Pagination";

export default class PagedResult<T> {
    pagination?: Pagination
    items: Array<T> = []
}