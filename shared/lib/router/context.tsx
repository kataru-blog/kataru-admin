import { createContext } from 'react'

export interface RouterContextType {
    currentPath: string
    navigate: (path: string) => void
    back: () => void
    replace: (path: string) => void
    pathname: string
    query: Record<string, string>
    asPath: string
    reload: () => void
}

export const RouterContext = createContext<RouterContextType | null>(null)
