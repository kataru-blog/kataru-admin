import { Children, isValidElement, type ReactNode } from 'react'
import { useRouter } from './use-router'

interface RouteProps {
    path: string
    element: any
}

interface RoutesProps {
    children: ReactNode
}

export const Routes = ({ children }: RoutesProps) => {
    const { currentPath } = useRouter()

    const matchedRoute = Children.toArray(children).find((child) => {
        if (!isValidElement<RouteProps>(child)) return false

        const { path } = child.props
        if (!path) return false

        if (path === currentPath) return true

        const pathParts = path.split('/').filter(Boolean)
        const currentParts = currentPath.split('/').filter(Boolean)

        if (pathParts.length !== currentParts.length) return false

        return pathParts.every((part: string, index: number) => {
            if (part.startsWith(':')) return true
            return part === currentParts[index]
        })
    })

    return <>{matchedRoute}</>
}
