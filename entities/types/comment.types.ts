export interface Comment {
    id?: string
    postId: string
    userId: string
    content: string
    isSecret?: boolean
    parentId?: string
    createdAt?: Date
    updatedAt?: Date
}
