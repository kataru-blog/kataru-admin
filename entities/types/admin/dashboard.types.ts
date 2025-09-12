import type { Blog } from '../blog.types'
import type { Post } from '../post.types'

export type DashboardSummary = {
    blogId: string
    totalPosts: number
    totalViews: number
    totalLikes: number
    todayViews: number
    todayLikes: number
}

export type ChartDataPoint = {
    period: string
    views: number
    likes: number
}

export type DashboardChartResponse = {
    period: 'daily' | 'weekly' | 'monthly'
    data: ChartDataPoint[]
}

export type PostWithStats = Post & {
    blog: Blog
    viewCount: number
    likeCount: number
}

export type TopPostsResponse = PostWithStats[]

export type DashboardChartParams = {
    period: 'daily' | 'weekly' | 'monthly'
    startDate?: string
    endDate?: string
}

export type TopPostsParams = {
    limit?: number
    startDate?: string
    endDate?: string
}
