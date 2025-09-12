import { useDeleteAdminComment, useGetAdminComments } from 'entities/comments/comments.query'
import type { AdminCommentsListParams } from 'entities/types'
import { Paginator } from 'features'
import { Calendar, FileText, MessageSquare, Trash2, User } from 'lucide-react'
import { Fragment, useMemo, type FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar'
import { Badge } from 'shared/ui/badge'
import { Button } from 'shared/ui/button'
import { Card, CardContent } from 'shared/ui/card'
import { Skeleton } from 'shared/ui/skeleton'

interface CommentsListProps {
    searchKeyword: string
    sortOrder: 'asc' | 'desc'
    currentPage: number
    onPageChange: (page: number) => void
}

export const CommentsList: FC<CommentsListProps> = ({ searchKeyword, sortOrder, currentPage, onPageChange }) => {
    const params: AdminCommentsListParams = useMemo(
        () => ({
            keyword: searchKeyword || undefined,
            sortOrder,
            page: currentPage,
            limit: 10,
        }),
        [searchKeyword, sortOrder, currentPage],
    )

    const { data, isLoading } = useGetAdminComments(params)
    const { mutate: deleteComment } = useDeleteAdminComment()

    const handleDeleteComment = (commentId: string) => {
        deleteComment(commentId)
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5'>
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className='p-6'>
                            <div className='flex flex-col gap-3.5'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Skeleton className='size-10 rounded-full' />
                                        <div className='flex flex-col gap-2'>
                                            <Skeleton className='h-5 w-24' />
                                            <Skeleton className='h-3.5 w-32' />
                                        </div>
                                    </div>
                                    <Skeleton className='h-8 w-8' />
                                </div>
                                <div className='pl-13'>
                                    <Skeleton className='h-5 w-full mb-3' />
                                    <Skeleton className='h-12 w-full' />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    const comments = data?.comments || []
    const totalPages = data?.totalPages || 1

    if (comments.length === 0) {
        return (
            <Card>
                <CardContent className='p-6'>
                    <div className='flex flex-col items-center justify-center py-12 gap-3.5'>
                        <MessageSquare className='size-12 text-muted-foreground' />
                        <h3 className='text-lg font-medium'>No comments found</h3>
                        <p className='text-muted-foreground'>
                            {searchKeyword ? 'Try adjusting your search criteria.' : 'No comments have been posted yet.'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Fragment>
            <div className='flex flex-col gap-3.5'>
                {comments.map((comment) => (
                    <Card key={comment.id} className={comment.isSecret ? 'opacity-50' : ''}>
                        <CardContent className='p-6'>
                            <div className='flex flex-col gap-3.5'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='size-10'>
                                            <AvatarImage src={comment.user.image || ''} />
                                            <AvatarFallback>
                                                <User className='size-3.5' />
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-medium'>{comment.user.name}</span>
                                                {comment.isSecret && <Badge variant='destructive'>Hidden</Badge>}
                                            </div>
                                            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                                                <Calendar className='size-3' />
                                                {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant='outline' size='sm' onClick={() => handleDeleteComment(comment.id)} disabled={comment.isSecret}>
                                        <Trash2 className='size-3.5' />
                                    </Button>
                                </div>

                                <div className='pl-13 flex flex-col gap-3'>
                                    <p className='text-foreground'>{comment.content}</p>

                                    <div className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                                        <FileText className='size-3.5 text-muted-foreground' />
                                        <span className='text-sm text-muted-foreground'>Comment on post #{comment.post.postNumber}:</span>
                                        <span className='text-sm font-medium'>{comment.post.title}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-sm text-muted-foreground'>Showing {comments.length} comments</p>
            </div>

            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </Fragment>
    )
}
