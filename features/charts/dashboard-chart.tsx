import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui/select'

interface DashboardChartProps {
    metric: 'views' | 'likes'
    period: 'daily' | 'weekly' | 'monthly'
    setMetric: (metric: 'views' | 'likes') => void
    setPeriod: (period: 'daily' | 'weekly' | 'monthly') => void
    data: { period: string; views: number; likes: number }[]
}

export const DashboardChart: FC<DashboardChartProps> = ({ metric, period, setMetric, setPeriod, data }) => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='text-lg'>Analytics</CardTitle>
                        <CardDescription className='text-sm'>{metric === 'views' ? 'Views' : 'Likes'} over time</CardDescription>
                    </div>
                    <div className='flex gap-2'>
                        <Select value={metric} onValueChange={(value: 'views' | 'likes') => setMetric(value)}>
                            <SelectTrigger className='w-24 h-8'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='views'>Views</SelectItem>
                                <SelectItem value='likes'>Likes</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={period} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setPeriod(value)}>
                            <SelectTrigger className='w-28 h-8'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='daily'>Daily</SelectItem>
                                <SelectItem value='weekly'>Weekly</SelectItem>
                                <SelectItem value='monthly'>Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='h-52'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='period' />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type='monotone'
                                dataKey={metric}
                                stroke={metric === 'views' ? 'var(--chart-1)' : 'var(--chart-2)'}
                                strokeWidth={2}
                                name={metric === 'views' ? 'Views' : 'Likes'}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
