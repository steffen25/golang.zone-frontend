export interface IPost {
    id?: number
    userId?: number
    title?: string
    slug?: string
    author?: string
    body?: string
    createdAt?: string
    updatedAt?: string
}

export class Post implements IPost{
    id?: number
    userId?: number
    title?: string
    slug?: string
    author?: string
    body?: string
    createdAt?: string
    updatedAt?: string
}