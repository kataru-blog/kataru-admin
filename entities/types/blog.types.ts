export interface Blog {
    id?: string
    userId: string
    title: string
    description?: string
    faviconUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CustomDomain {
    id?: string
    blogId: string
    domain: string
    createdAt?: Date
}
