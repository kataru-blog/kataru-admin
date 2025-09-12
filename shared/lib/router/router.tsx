import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { RouterContext } from './context'

interface RouterProps {
    children: ReactNode
}

export const Router = ({ children }: RouterProps) => {
    const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
    const [searchParams, setSearchParams] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        const query: Record<string, string> = {}
        params.forEach((value, key) => {
            query[key] = value
        })
        return query
    })

    const navigate = (path: string) => {
        const [pathname, search] = path.split('?')
        window.history.pushState({}, '', path)
        setCurrentPath(pathname)
        updateSearchParams(search || '')
    }

    const replace = (path: string) => {
        const [pathname, search] = path.split('?')
        window.history.replaceState({}, '', path)
        setCurrentPath(pathname)
        updateSearchParams(search || '')
    }

    const back = () => window.history.back()

    const reload = () => window.location.reload()

    const updateSearchParams = (search: string) => {
        const params = new URLSearchParams(search)
        const query: Record<string, string> = {}
        params.forEach((value, key) => {
            query[key] = value
        })
        setSearchParams(query)
    }

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname)
            updateSearchParams(window.location.search)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const asPath = currentPath + (Object.keys(searchParams).length > 0 ? '?' + new URLSearchParams(searchParams).toString() : '')

    return (
        <RouterContext.Provider
            value={{
                currentPath,
                navigate,
                back,
                replace,
                pathname: currentPath,
                query: searchParams,
                asPath,
                reload,
            }}>
            {children}
        </RouterContext.Provider>
    )
}
