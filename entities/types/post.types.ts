export interface Post {
    id?: string
    blogId: string
    postNumber: number
    title: string
    content: string
    thumbnailUrl?: string
    summary?: string
    isNotice?: boolean
    isHidden?: boolean
    allowComment?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface Tag {
    id?: string
    name: string
}

export interface PostTag {
    postId: string
    tagId: string
}
