import { useGetDashboardSummary } from '@/entities/dashboard'
import { SummaryCard } from '@/features'
import { Eye, FileText, Heart, TrendingUp } from 'lucide-react'
import { Fragment } from 'react'

export const DashboardCards = () => {
    const { data: dashboardSummary, isLoading: isSummaryLoading, error } = useGetDashboardSummary()

    if (error) {
        return (
            <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-red-600'>
                데이터를 불러오는 중 오류가 발생했습니다: {error.message}
            </div>
        )
    }

    return (
        <Fragment>
            <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
                <SummaryCard title='Total Posts' icon={FileText} value={isSummaryLoading ? '...' : dashboardSummary?.totalPosts || 0} />
                <SummaryCard
                    title='Total Views'
                    icon={Eye}
                    value={isSummaryLoading ? '...' : dashboardSummary?.totalViews || 0}
                    todayValue={isSummaryLoading ? undefined : dashboardSummary?.todayViews}
                />
                <SummaryCard
                    title='Total Likes'
                    icon={Heart}
                    value={isSummaryLoading ? '...' : dashboardSummary?.totalLikes || 0}
                    todayValue={isSummaryLoading ? undefined : dashboardSummary?.todayLikes}
                />
                <SummaryCard
                    title='Engagement Rate'
                    icon={TrendingUp}
                    value={
                        isSummaryLoading
                            ? '...'
                            : dashboardSummary
                              ? ((dashboardSummary.totalLikes / dashboardSummary.totalViews) * 100).toFixed(1) + '%'
                              : '0%'
                    }
                    todayValue={undefined}
                />
            </div>
        </Fragment>
    )
}
