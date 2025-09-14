import { fetcher } from 'shared/lib/utils'
import type { DeleteImageResponse, GetImagesResponse, UploadImageResponse } from '../types/images.types'

export const uploadImage = async (file: File, postId?: string, blogId?: string) => {
    const formData = new FormData()
    formData.append('file', file)
    if (postId && postId !== 'temp') {
        formData.append('postId', postId)
    }
    if (blogId) {
        formData.append('blogId', blogId)
    }

    return fetcher<UploadImageResponse>('/images/upload', {
        method: 'POST',
        body: formData,
    })
}

export const getImagesList = () => fetcher<GetImagesResponse>('/images/list')

export const getImagesByPostId = (postId: string) => {
    if (postId === 'temp') {
        return getImagesList()
    }
    return fetcher<GetImagesResponse>(`/images/list/${postId}`)
}

export const deleteImage = (imageId: string) =>
    fetcher<DeleteImageResponse>(`/images/${imageId}`, {
        method: 'DELETE',
    })