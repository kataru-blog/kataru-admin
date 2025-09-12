import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const query = cache(
    () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    refetchOnWindowFocus: false,
                    refetchOnMount: false,
                    staleTime: 1000 * 60 * 5,
                    gcTime: 1000 * 60 * 3,
                    refetchOnReconnect: true,
                },
                mutations: {
                    retry: 1,
                },
            },
        }),
)
export default query
