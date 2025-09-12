import { type FC, type ReactNode } from 'react'

interface SiteHeaderProps {
    title: string
    description: string
    children?: ReactNode
}

export const SiteHeader: FC<SiteHeaderProps> = ({ title, description, children }) => {
    return (
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-muted-foreground text-sm'>{description}</p>
            </div>
            {children}
        </div>
    )
}
