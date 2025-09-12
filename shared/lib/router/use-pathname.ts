import { useContext } from 'react'
import { RouterContext } from './context'

export const usePathname = () => {
    const context = useContext(RouterContext)
    if (!context) {
        throw new Error('usePathname must be used within Router')
    }
    return context.currentPath
}
