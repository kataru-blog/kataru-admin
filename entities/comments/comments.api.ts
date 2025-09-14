import { createQueryString, fetcher } from 'shared/lib/utils'
import type { AdminCommentsListParams, AdminCommentsListResponse, DeleteAdminCommentResponse } from '../types'

export const getAdminComments = (params?: AdminCommentsListParams) =>
    fetcher<AdminCommentsListResponse>(`/admin/comments?${createQueryString(params || {})}`)

export const deleteAdminComment = (commentId: string) =>
    fetcher<DeleteAdminCommentResponse>(`/admin/comments/${commentId}`, {
        method: 'DELETE',
    })
