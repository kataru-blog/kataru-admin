import { useGetTopPostsByViews } from '@/entities/dashboard'
import { Eye, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card'

export const DashboardArticles = () => {
    const { data: topPostsData, isLoading: isTopPostsLoading } = useGetTopPostsByViews({ limit: 5 })
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Top Performing Posts</CardTitle>
                <CardDescription className='text-sm'>Your most popular content</CardDescription>
            </CardHeader>
            <CardContent>
                {isTopPostsLoading ? (
                    <div className='flex items-center justify-center h-32'>
                        <span className='text-sm text-muted-foreground'>Loading...</span>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {topPostsData?.map((post) => (
                            <div key={post.id} className='flex items-center gap-3 border h-14'>
                                <img
                                    src={post.thumbnailUrl || 'https://kataru.dev/favicon.ico'}
                                    alt={post.title}
                                    className='h-full object-cover border-r aspect-video'
                                />
                                <div className='flex-1 min-w-0'>
                                    <h3 className='font-medium text-sm line-clamp-1'>{post.title}</h3>
                                    <p className='text-xs text-muted-foreground line-clamp-1'>{post.summary}</p>
                                </div>
                                <div className='flex items-center gap-3 text-xs text-muted-foreground px-3'>
                                    <div className='flex items-center gap-1'>
                                        <Eye className='size-3' />
                                        {post.viewCount.toLocaleString()}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Heart className='size-3' />
                                        {post.likeCount}
                                    </div>
                                </div>
                            </div>
                        )) || null}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
