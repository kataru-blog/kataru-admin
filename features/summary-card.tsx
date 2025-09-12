import { type LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card'

interface SummaryCardProps {
    title: string
    icon: LucideIcon
    value: string | number
    todayValue?: string | number
}

export const SummaryCard: FC<SummaryCardProps> = ({ title, icon, value, todayValue }) => {
    const Icon = icon

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='text-sm font-medium'>{title}</CardTitle>
                <Icon className='size-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
                <div className='text-xl font-bold'>{value.toLocaleString()}</div>
                {todayValue !== undefined && <p className='text-xs text-muted-foreground'>+{todayValue} today</p>}
            </CardContent>
        </Card>
    )
}
