import { fetcher } from 'shared/lib/utils'
import type { SessionResponse, UpdateUserInfoRequest, UpdateUserInfoResponse, UserInfoResponse } from '../types'

export const getUserInfo = () => fetcher<UserInfoResponse>('/admin/user')

export const updateUserInfo = (data: UpdateUserInfoRequest) =>
    fetcher<UpdateUserInfoResponse>('/admin/user', {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const getSession = async () =>
    fetcher<SessionResponse>('/auth/get-session', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
