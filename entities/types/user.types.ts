export interface User {
    id?: string
    name: string
    email: string
    nickname: string
    emailVerified?: boolean
    image?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Session {
    id?: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress?: string
    userAgent?: string
    userId: string
}

export interface Account {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string
    refreshToken?: string
    idToken?: string
    accessTokenExpiresAt?: Date
    refreshTokenExpiresAt?: Date
    scope?: string
    password?: string
    createdAt: Date
    updatedAt: Date
}

export interface Verification {
    id?: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date
}


export type SessionUser = Pick<
    User,
    'id' | 'name' | 'email' | 'nickname' | 'emailVerified' | 'image' | 'createdAt' | 'updatedAt'
>

export type SessionData = Pick<
    Session,
    'id' | 'expiresAt' | 'token' | 'createdAt' | 'updatedAt' | 'ipAddress' | 'userAgent' | 'userId'
>

export type SessionResponse = {
    user: SessionUser
    session: SessionData
}