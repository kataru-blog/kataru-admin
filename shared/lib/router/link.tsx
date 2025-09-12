import type { ReactNode } from 'react'
import { useRouter } from './use-router'

interface LinkProps {
    href: string
    children: ReactNode
    className?: string
}

export const Link = ({ href, children, className }: LinkProps) => {
    const { navigate } = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigate(href)
    }

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    )
}
