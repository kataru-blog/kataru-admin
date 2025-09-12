import { createQueryString, fetcher } from 'shared/lib/utils'
import type {
    AdminPostsListParams,
    AdminPostsListResponse,
    AdminPostWithStats,
    CreateAdminPostRequest,
    CreateAdminPostResponse,
    DeleteAdminPostResponse,
    UpdateAdminPostRequest,
    UpdateAdminPostResponse,
} from '../types'

export const getAdminPosts = (params?: AdminPostsListParams) => fetcher<AdminPostsListResponse>(`/admin/posts?${createQueryString(params || {})}`)

export const getAdminPostById = (postId: string) => fetcher<AdminPostWithStats>(`/admin/posts/${postId}`)

export const createAdminPost = (data: CreateAdminPostRequest) =>
    fetcher<CreateAdminPostResponse>('/admin/posts', {
        method: 'POST',
        body: JSON.stringify(data),
    })

export const updateAdminPost = (postId: string, data: UpdateAdminPostRequest) =>
    fetcher<UpdateAdminPostResponse>(`/admin/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const deleteAdminPost = (postId: string) =>
    fetcher<DeleteAdminPostResponse>(`/admin/posts/${postId}`, {
        method: 'DELETE',
    })
