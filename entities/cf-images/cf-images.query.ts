import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import { deleteImage, getImagesByPostId, uploadImage } from './cf-images.api'

export const useUploadImage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ file, postId }: { file: File; postId: string }) => uploadImage(file, postId),
        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGES.LIST, postId] })
        },
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