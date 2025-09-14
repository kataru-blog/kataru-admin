import { useGetAdminPosts, useDeleteAdminPost } from 'entities/posts'
import { ArticleCard, Paginator } from 'features'
import { Fragment, useState } from 'react'
import { Skeleton } from 'shared/ui/skeleton'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from 'shared/ui/alert-dialog'

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
    const deletePost = useDeleteAdminPost()
    const [deletePostId, setDeletePostId] = useState<string | null>(null)

    const posts = data?.posts || []
    const totalPages = data?.totalPages || 1

    const handleDelete = async () => {
        if (!deletePostId) return

        try {
            await deletePost.mutateAsync(deletePostId)
            toast.success('포스트가 삭제되었습니다')
            setDeletePostId(null)
        } catch (error) {
            toast.error('포스트 삭제에 실패했습니다')
            console.error('Failed to delete post:', error)
        }
    }

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
                    <ArticleCard key={post.id} {...post} onDelete={(id) => setDeletePostId(id)} />
                ))}
            </div>

            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

            <AlertDialog open={!!deletePostId} onOpenChange={(open) => !open && setDeletePostId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>이 작업은 되돌릴 수 없습니다. 포스트가 영구적으로 삭제됩니다.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground'>
                            삭제
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    )
}
