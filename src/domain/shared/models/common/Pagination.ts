export interface Pagination {
    currentPage: number,
    firstPageUrl?: string,
    from: number,
    lastPage: number,
    lastPageUrl?: string,
    nextPageUrl?: string,
    perPage: number,
    prevPageUrl?: string,
    to: number,
    total: number,
}