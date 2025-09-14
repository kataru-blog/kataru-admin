import type { ComponentType } from 'react'
import { createElement } from 'react'
import { useRouter } from './use-router'

interface RouteProps<T = Record<string, unknown>> {
    path: string
    element: ComponentType<T & { searchParams: Record<string, string> }>
}

export const Route = <T extends Record<string, unknown> = Record<string, unknown>>({ path, element }: RouteProps<T>) => {
    const { currentPath, query } = useRouter()

    const extractParams = () => {
        const pathParts = path.split('/').filter(Boolean)
        const currentParts = currentPath.split('/').filter(Boolean)
        const params: Record<string, string> = {}

        pathParts.forEach((part, index) => {
            if (part.startsWith(':')) {
                const paramName = part.slice(1)
                params[paramName] = currentParts[index] || ''
            }
        })

        return params
    }

    const isMatch = () => {
        if (path === currentPath) return true

        const pathParts = path.split('/').filter(Boolean)
        const currentParts = currentPath.split('/').filter(Boolean)

        if (pathParts.length !== currentParts.length) return false

        const hasStaticPart = pathParts.every((part, index) => {
            if (!part.startsWith(':')) {
                return part === currentParts[index]
            }
            return true
        })

        if (!hasStaticPart) return false

        return pathParts.every((part, index) => {
            if (part.startsWith(':')) return true
            return part === currentParts[index]
        })
    }

    if (!isMatch()) return null

    const pathParams = extractParams()
    const props = {
        ...pathParams,
        searchParams: query,
    } as T & { searchParams: Record<string, string> }

    return createElement(element, props)
}
