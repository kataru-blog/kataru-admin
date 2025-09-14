export interface ImageVariants {
    small?: string
    medium?: string
    large?: string
}

export interface UploadImageRequest {
    file: File
    postId: string
}

export interface UploadImageResponse {
    success: boolean
    data: {
        id: string
        url: string
        thumbnailUrl: string
        variants: ImageVariants
    }
}

export interface ImageWithDetails {
    id: string
    postId: string
    originalUrl: string
    thumbnailUrl: string
    r2Key: string
    width?: number
    height?: number
    size?: number
    mimeType?: string
    createdAt: string
    variants: ImageVariants
}

export interface GetImagesResponse {
    success: boolean
    data: ImageWithDetails[]
}

export interface DeleteImageResponse {
    success: boolean
    message: string
}