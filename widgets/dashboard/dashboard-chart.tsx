import { useGetDashboardChartData } from '@/entities/dashboard'
import { DashboardChart as DashboardChartComponent } from '@/features/charts'

interface DashboardChartProps {
    metric: 'views' | 'likes'
    period: 'daily' | 'weekly' | 'monthly'
    setMetric: (metric: 'views' | 'likes') => void
    setPeriod: (period: 'daily' | 'weekly' | 'monthly') => void
}

export const DashboardChart = ({ metric, period, setMetric, setPeriod }: DashboardChartProps) => {
    const { data: chartData, isLoading: isChartLoading } = useGetDashboardChartData({ period })
    return (
        <DashboardChartComponent
            metric={metric}
            period={period}
            setMetric={setMetric}
            setPeriod={setPeriod}
            data={isChartLoading ? [] : chartData?.data || []}
        />
    )
}
