import { SiteHeader } from '@/features'
import { DashboardCards, DashboardChart } from '@/widgets/dashboard'
import { DashboardArticles } from '@/widgets/dashboard/dashboard-aritlces'
import { useState, type FC } from 'react'

export const Dashboard: FC = () => {
    const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
    const [metric, setMetric] = useState<'views' | 'likes'>('views')

    return (
        <div className='flex flex-col gap-3.5 p-3.5'>
            <SiteHeader title='Dashboard' description='Overview of your blog performance' />
            <DashboardCards />
            <DashboardChart metric={metric} period={period} setMetric={setMetric} setPeriod={setPeriod} />
            <DashboardArticles />
        </div>
    )
}
