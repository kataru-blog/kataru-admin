import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import { deleteImage, getImagesByPostId, getImagesList, uploadImage } from './images.api'

export const useUploadImage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ file, postId, blogId }: { file: File; postId?: string; blogId?: string }) =>
            uploadImage(file, postId, blogId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGES.LIST] })
            if (variables.postId) {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGES.LIST, variables.postId] })
            }
        },
    })
}

export const useGetImagesList = () => {
    return useQuery({
        queryKey: [QUERY_KEY.IMAGES.LIST],
        queryFn: () => getImagesList(),
    })
}

export const useGetImagesByPostId = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.IMAGES.LIST, postId],
        queryFn: () => getImagesByPostId(postId),
        enabled: !!postId,
    })
}

export const useDeleteImage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (imageId: string) => deleteImage(imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGES.LIST] })
        },
    })
}