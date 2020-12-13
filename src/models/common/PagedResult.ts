import Pagination from "@/models/common/Pagination";

export default class PagedResult<T> {
    pagination?: Pagination
    items: Array<T> = []
}