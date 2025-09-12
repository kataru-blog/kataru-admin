import { fetcher } from '@/shared/lib/utils'
import type {
    BlogInfoResponse,
    CreateCustomDomainRequest,
    CreateCustomDomainResponse,
    CreateCustomLinkRequest,
    CreateCustomLinkResponse,
    CustomDomainsListResponse,
    CustomLinksListResponse,
    DeleteCustomDomainResponse,
    DeleteCustomLinkResponse,
    ReorderCustomLinksRequest,
    ReorderCustomLinksResponse,
    UpdateBlogInfoRequest,
    UpdateBlogInfoResponse,
    UpdateCustomDomainRequest,
    UpdateCustomDomainResponse,
    UpdateCustomLinkRequest,
    UpdateCustomLinkResponse,
} from '../types'

export const getBlogInfo = () => fetcher<BlogInfoResponse>('/admin/blog')

export const updateBlogInfo = (data: UpdateBlogInfoRequest) =>
    fetcher<UpdateBlogInfoResponse>('/admin/blog', {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const getCustomDomains = () => fetcher<CustomDomainsListResponse>('/admin/domains')

export const createCustomDomain = (data: CreateCustomDomainRequest) =>
    fetcher<CreateCustomDomainResponse>('/admin/domains', {
        method: 'POST',
        body: JSON.stringify(data),
    })

export const updateCustomDomain = (domainId: string, data: UpdateCustomDomainRequest) =>
    fetcher<UpdateCustomDomainResponse>(`/admin/domains/${domainId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const deleteCustomDomain = (domainId: string) =>
    fetcher<DeleteCustomDomainResponse>(`/admin/domains/${domainId}`, {
        method: 'DELETE',
    })

export const getCustomLinks = () => fetcher<CustomLinksListResponse>('/admin/links')

export const createCustomLink = (data: CreateCustomLinkRequest) =>
    fetcher<CreateCustomLinkResponse>('/admin/links', {
        method: 'POST',
        body: JSON.stringify(data),
    })

export const updateCustomLink = (linkId: string, data: UpdateCustomLinkRequest) =>
    fetcher<UpdateCustomLinkResponse>(`/admin/links/${linkId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const deleteCustomLink = (linkId: string) =>
    fetcher<DeleteCustomLinkResponse>(`/admin/links/${linkId}`, {
        method: 'DELETE',
    })

export const reorderCustomLinks = (data: ReorderCustomLinksRequest) =>
    fetcher<ReorderCustomLinksResponse>('/admin/links/reorder', {
        method: 'PUT',
        body: JSON.stringify(data),
    })
