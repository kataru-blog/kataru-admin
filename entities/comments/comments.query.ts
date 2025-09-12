import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import type { AdminCommentsListParams } from '../types'
import { deleteAdminComment, getAdminComments } from './comments.api'

export const useGetAdminComments = (params?: AdminCommentsListParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.COMMENTS.LIST, params],
        queryFn: () => getAdminComments(params),
    })
}

export const useDeleteAdminComment = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: deleteAdminComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMENTS.LIST] })
        },
    })
}