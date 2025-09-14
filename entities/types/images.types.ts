export interface ImageVariants {
    mobile: string
    tablet: string
    pc: string
    thumbnail: string
    original: string
}

export interface UploadImageRequest {
    file: File
    postId?: string
    blogId?: string
}

export interface UploadImageResponse {
    success: boolean
    data: {
        id: string
        postId: string | null
        blogId: string | null
        url: string
        thumbnailUrl: string
        variants: ImageVariants
    }
}

export interface ImageData {
    id: string
    postId: string | null
    blogId: string | null
    originalUrl: string
    thumbnailUrl: string
    createdAt: string
    variants: ImageVariants
}

export interface GetImagesResponse {
    success: boolean
    data: ImageData[]
}

export interface DeleteImageResponse {
    success: boolean
    message: string
}