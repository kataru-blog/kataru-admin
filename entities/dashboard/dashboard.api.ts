import { createQueryString, fetcher } from 'shared/lib/utils'
import type { DashboardChartParams, DashboardChartResponse, DashboardSummary, TopPostsParams, TopPostsResponse } from '../types'

export const getDashboardSummary = () => fetcher<DashboardSummary>('/admin/dashboard/summary')

export const getDashboardChartData = (params: DashboardChartParams) =>
    fetcher<DashboardChartResponse>(`/admin/dashboard/chart?${createQueryString(params)}`)

export const getTopPostsByViews = (params?: TopPostsParams) =>
    fetcher<TopPostsResponse>(`/admin/dashboard/top-posts/views?${createQueryString(params || {})}`)

export const getTopPostsByLikes = (params?: TopPostsParams) =>
    fetcher<TopPostsResponse>(`/admin/dashboard/top-posts/likes?${createQueryString(params || {})}`)
