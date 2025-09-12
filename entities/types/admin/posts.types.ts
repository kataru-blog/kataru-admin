import type { Blog } from '../blog.types'
import type { Post, Tag } from '../post.types'

export type AdminPostWithStats = Post & {
    blog: Blog
    tags: Array<Tag>
    viewCount: number
    likeCount: number
    commentCount: number
}

export type AdminPostsListResponse = {
    posts: AdminPostWithStats[]
    totalCount: number
    limit: number
    offset: number
    page: number
    totalPages: number
}

export type AdminPostsListParams = {
    keyword?: string
    sortBy?: 'createdAt' | 'title'
    sortOrder?: 'asc' | 'desc'
    limit?: number
    page?: number
    includeHidden?: boolean
}

export type CreateAdminPostRequest = {
    title: string
    content: string
    thumbnailUrl?: string
    summary?: string
    isNotice?: boolean
    allowComment?: boolean
    tags?: string[]
}

export type CreateAdminPostResponse = {
    id: string
    postNumber: number
}

export type UpdateAdminPostRequest = {
    title?: string
    content?: string
    thumbnailUrl?: string
    summary?: string
    isNotice?: boolean
    allowComment?: boolean
    isHidden?: boolean
    tags?: string[]
}

export type UpdateAdminPostResponse = {
    success: boolean
}

export type DeleteAdminPostResponse = {
    success: boolean
}
