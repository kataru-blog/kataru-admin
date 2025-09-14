import { fetcher } from 'shared/lib/utils'
import type { DeleteImageResponse, GetImagesResponse, UploadImageResponse } from '../types/cf-images.types'

export const uploadImage = async (file: File, postId: string) => {
    const formData = new FormData()
    formData.append('file', file)
    postId !== 'temp' && formData.append('postId', postId)

    return fetcher<UploadImageResponse>('/cf-images/upload', {
        method: 'POST',
        body: formData,
    })
}

export const getImagesByPostId = (postId: string) => {
    // if postId temp, then not need specify postId
    if (postId === 'temp') {
        return fetcher<GetImagesResponse>('/cf-images/list')
    }

    return fetcher<GetImagesResponse>(`/cf-images/list/${postId}`)
}

export const deleteImage = (imageId: string) =>
    fetcher<DeleteImageResponse>(`/cf-images/${imageId}`, {
        method: 'DELETE',
    })
