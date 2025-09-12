import type { Post } from '../post.types'
import type { User } from '../user.types'
import type { Comment } from '../comment.types'

export type AdminCommentWithPost = Comment & {
    post: Pick<Post, 'id' | 'postNumber' | 'title'>
    user: Pick<User, 'id' | 'name' | 'image'>
}

export type AdminCommentsListResponse = {
    comments: AdminCommentWithPost[]
    totalCount: number
    limit: number
    offset: number
    page: number
    totalPages: number
}

export type AdminCommentsListParams = {
    keyword?: string
    sortOrder?: 'asc' | 'desc'
    limit?: number
    page?: number
}

export type DeleteAdminCommentResponse = {
    success: boolean
}
