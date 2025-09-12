import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from 'shared/lib/query'
import type { DashboardChartParams, TopPostsParams } from '../types'
import { getDashboardChartData, getDashboardSummary, getTopPostsByLikes, getTopPostsByViews } from './dashboard.api'

export const useGetDashboardSummary = () => {
    return useQuery({
        queryKey: [QUERY_KEY.DASHBOARD.SUMMARY],
        queryFn: getDashboardSummary,
    })
}

export const useGetDashboardChartData = (params: DashboardChartParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.DASHBOARD.CHART, params],
        queryFn: () => getDashboardChartData(params),
    })
}

export const useGetTopPostsByViews = (params?: TopPostsParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.DASHBOARD.TOP_POSTS_VIEWS, params],
        queryFn: () => getTopPostsByViews(params),
    })
}

export const useGetTopPostsByLikes = (params?: TopPostsParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.DASHBOARD.TOP_POSTS_LIKES, params],
        queryFn: () => getTopPostsByLikes(params),
    })
}
