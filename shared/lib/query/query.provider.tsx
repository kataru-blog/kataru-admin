import { QueryClientProvider } from '@tanstack/react-query'
import { type FC, type PropsWithChildren } from 'react'
import query from './cached-query'

const queryClient = query()

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
