import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import type {
    CreateCustomDomainRequest,
    CreateCustomLinkRequest,
    ReorderCustomLinksRequest,
    UpdateBlogInfoRequest,
    UpdateCustomDomainRequest,
    UpdateCustomLinkRequest,
} from '../types'
import {
    createCustomDomain,
    createCustomLink,
    deleteCustomDomain,
    deleteCustomLink,
    getBlogInfo,
    getCustomDomains,
    getCustomLinks,
    reorderCustomLinks,
    updateBlogInfo,
    updateCustomDomain,
    updateCustomLink,
} from './blog.api'

export const useGetBlogInfo = () => {
    return useQuery({
        queryKey: [QUERY_KEY.BLOG.INFO],
        queryFn: getBlogInfo,
    })
}

export const useUpdateBlogInfo = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: updateBlogInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.INFO] })
        },
    })
}

export const useGetCustomDomains = () => {
    return useQuery({
        queryKey: [QUERY_KEY.BLOG.DOMAINS],
        queryFn: getCustomDomains,
    })
}

export const useCreateCustomDomain = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: createCustomDomain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.DOMAINS] })
        },
    })
}

export const useUpdateCustomDomain = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ domainId, data }: { domainId: string; data: UpdateCustomDomainRequest }) => 
            updateCustomDomain(domainId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.DOMAINS] })
        },
    })
}

export const useDeleteCustomDomain = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: deleteCustomDomain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.DOMAINS] })
        },
    })
}

export const useGetCustomLinks = () => {
    return useQuery({
        queryKey: [QUERY_KEY.BLOG.LINKS],
        queryFn: getCustomLinks,
    })
}

export const useCreateCustomLink = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: createCustomLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.LINKS] })
        },
    })
}

export const useUpdateCustomLink = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ linkId, data }: { linkId: string; data: UpdateCustomLinkRequest }) => 
            updateCustomLink(linkId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.LINKS] })
        },
    })
}

export const useDeleteCustomLink = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: deleteCustomLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.LINKS] })
        },
    })
}

export const useReorderCustomLinks = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: reorderCustomLinks,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOG.LINKS] })
        },
    })
}