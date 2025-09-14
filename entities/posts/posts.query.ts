import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import type { AdminPostsListParams, CreateAdminPostRequest, UpdateAdminPostRequest } from '../types'
import { createAdminPost, deleteAdminPost, getAdminPostById, getAdminPosts, updateAdminPost } from './posts.api'
import { useGetSession } from '../user'

export const useGetAdminPosts = (params?: AdminPostsListParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.POSTS.LIST, params],
        queryFn: () => getAdminPosts(params),
    })
}

export const useGetAdminPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.POSTS.DETAIL, postId],
        queryFn: () => getAdminPostById(postId),
        enabled: !!postId,
    })
}

export const useCreateAdminPost = () => {
    const queryClient = useQueryClient()
    const { data: session } = useGetSession()

    return useMutation({
        mutationFn: (data: CreateAdminPostRequest) => {
            return createAdminPost({
                ...data,
                userId: session?.user?.id,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS.LIST] })
        },
    })
}

export const useUpdateAdminPost = () => {
    const queryClient = useQueryClient()
    const { data: session } = useGetSession()

    return useMutation({
        mutationFn: ({ postId, data }: { postId: string; data: UpdateAdminPostRequest }) => {
            return updateAdminPost(postId, {
                ...data,
                userId: session?.user?.id,
            })
        },
        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS.LIST] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS.DETAIL, postId] })
        },
    })
}

export const useDeleteAdminPost = () => {
    const queryClient = useQueryClient()
    const { data: session } = useGetSession()

    return useMutation({
        mutationFn: (postId: string) => {
            return deleteAdminPost(postId, {
                userId: session?.user?.id,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS.LIST] })
        },
    })
}
