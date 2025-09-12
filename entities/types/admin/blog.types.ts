import type { Blog, CustomDomain } from '../blog.types'
import type { User } from '../user.types'
import type { CustomLink } from '../custom-link.types'

export type BlogInfoResponse = Blog

export type UpdateBlogInfoRequest = {
    title?: string
    description?: string
    faviconUrl?: string
}

export type UpdateBlogInfoResponse = {
    success: boolean
}

export type CustomDomainsListResponse = {
    domains: Array<CustomDomain>
}

export type CreateCustomDomainRequest = {
    domain: string
}

export type CreateCustomDomainResponse = {
    id: string
    domain: string
}

export type UpdateCustomDomainRequest = {
    domain: string
}

export type UpdateCustomDomainResponse = {
    success: boolean
}

export type DeleteCustomDomainResponse = {
    success: boolean
}

export type CustomLinksListResponse = {
    links: Array<CustomLink>
}

export type CreateCustomLinkRequest = {
    url: string
    label: string
    sortOrder?: number
}

export type CreateCustomLinkResponse = {
    id: string
    url: string
    label: string
    sortOrder: number
}

export type UpdateCustomLinkRequest = {
    url?: string
    label?: string
    sortOrder?: number
}

export type UpdateCustomLinkResponse = {
    success: boolean
}

export type DeleteCustomLinkResponse = {
    success: boolean
}

export type ReorderCustomLinksRequest = {
    linkOrders: Array<{
        id: string
        sortOrder: number
    }>
}

export type ReorderCustomLinksResponse = {
    success: boolean
}

export type UserInfoResponse = User

export type UpdateUserInfoRequest = {
    name?: string
    nickname?: string
    image?: string
}

export type UpdateUserInfoResponse = {
    success: boolean
}
