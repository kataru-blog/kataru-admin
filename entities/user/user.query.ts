import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import type { UpdateUserInfoRequest } from '../types'
import { getSession, getUserInfo, updateUserInfo } from './user.api'

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: [QUERY_KEY.USER.INFO],
        queryFn: getUserInfo,
    })
}

export const useUpdateUserInfo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER.INFO] })
        },
    })
}

export const useGetSession = () => {
    return useQuery({
        queryKey: [QUERY_KEY.USER.SESSION],
        queryFn: getSession,
    })
}
