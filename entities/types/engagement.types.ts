export interface View {
    id?: string
    postId: string
    userId?: string
    viewedAt?: Date
    ipAddress?: string
    userAgent?: string
}

export interface Like {
    id?: string
    postId: string
    userId: string
}
