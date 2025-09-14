import { useGetSession } from '@/entities/user'
import dayjs from 'dayjs'
import { useDeleteAdminPost, useGetAdminPostById } from 'entities/posts'
import { SiteHeader, UserCard } from 'features'
import { Calendar, Edit, Eye, Heart, Trash2 } from 'lucide-react'
import { useEffect, useState, type ComponentProps } from 'react'
import { useRouter } from 'shared/lib/router'
import { toHTMLWithTOC } from 'shared/lib/utils'
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
import { Badge } from 'shared/ui/badge'
import { Button } from 'shared/ui/button'
import { Skeleton } from 'shared/ui/skeleton'
import { toast } from 'sonner'

export const PostDetail = ({ id }: { id: string }) => {
    const router = useRouter()
    const { data: post, isLoading } = useGetAdminPostById(id)
    const deletePost = useDeleteAdminPost()
    const [__html, setHtml] = useState('')
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { data: session } = useGetSession()

    useEffect(() => {
        if (post?.content) {
            toHTMLWithTOC(post.content).then(({ html }) => {
                setHtml(html)
            })
        }
    }, [post?.content])

    const handleEdit = () => {
        router.navigate(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await deletePost.mutateAsync(id)
            toast.success('포스트가 삭제되었습니다')
            router.navigate('/posts')
        } catch (error) {
            toast.error('포스트 삭제에 실패했습니다')
            console.error('Failed to delete post:', error)
        }
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5 p-3.5'>
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-96 w-full' />
            </div>
        )
    }

    if (!post) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-muted-foreground'>포스트를 찾을 수 없습니다</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3.5 p-3.5'>
            <SiteHeader title={post.title} description={`포스트 #${post.postNumber}`}>
                <div className='flex gap-2'>
                    <Button onClick={handleEdit} variant='outline'>
                        <Edit className='size-4' />
                        수정
                    </Button>
                    <Button onClick={() => setShowDeleteDialog(true)} variant='destructive'>
                        <Trash2 className='size-4' />
                        삭제
                    </Button>
                </div>
            </SiteHeader>

            <div className='flex flex-col gap-6 max-w-4xl mx-auto w-full'>
                {post.thumbnailUrl && (
                    <div className='relative aspect-video overflow-hidden rounded-lg'>
                        <img src={post.thumbnailUrl} alt={post.title} className='size-full object-cover' />
                    </div>
                )}

                <div className='flex gap-2 items-center text-sm text-muted-foreground'>
                    <div className='flex gap-1 items-center'>
                        <Calendar className='size-3.5' />
                        <span>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Eye className='size-3.5' />
                        <span>{post.viewCount?.toLocaleString() || 0}</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Heart className='size-3.5' />
                        <span>{post.likeCount?.toLocaleString() || 0}</span>
                    </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                        {post.tags.map((tag, idx) => (
                            <Badge variant='secondary' key={tag.id + idx}>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <article className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html }} />

                <div className='border-t pt-6'>
                    <h3 className='text-lg font-semibold mb-4'>포스트 정보</h3>
                    <div className='grid gap-2 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>공지사항</span>
                            <span>{post.isNotice ? '예' : '아니오'}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>댓글 허용</span>
                            <span>{post.allowComment ? '예' : '아니오'}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>작성일</span>
                            <span>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss')}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>수정일</span>
                            <span>{dayjs(post.updatedAt).format('YYYY.MM.DD HH:mm:ss')}</span>
                        </div>
                    </div>
                </div>

                {session?.user && (
                    <div className='border-t pt-6'>
                        <UserCard
                            blogDescription={session?.user.nickname || ''}
                            user={{ ...session.user, customLinks: [] } as ComponentProps<typeof UserCard>['user']}
                        />
                    </div>
                )}
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
        </div>
    )
}
