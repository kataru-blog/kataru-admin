import { useGetAdminPosts } from 'entities/posts'
import { ArticleCard, Paginator } from 'features'
import { Fragment } from 'react/jsx-runtime'
import { Skeleton } from 'shared/ui/skeleton'

interface PostsListProps {
    searchKeyword: string
    sortBy: 'createdAt' | 'title'
    sortOrder: 'asc' | 'desc'
    currentPage: number
    onPageChange: (page: number) => void
}

export const PostsList = ({ searchKeyword, sortBy, sortOrder, currentPage, onPageChange }: PostsListProps) => {
    const { data, isLoading } = useGetAdminPosts({
        keyword: searchKeyword || undefined,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 10,
    })

    const posts = data?.posts || []
    const totalPages = data?.totalPages || 1

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5'>
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className='h-32 w-full' />
                ))}
            </div>
        )
    }

    if (!posts.length) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-muted-foreground'>No posts found</p>
            </div>
        )
    }

    return (
        <Fragment>
            <div className='flex flex-col gap-3.5'>
                {posts.map((post) => (
                    <ArticleCard key={post.id} {...post} />
                ))}
            </div>

            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </Fragment>
    )
}
