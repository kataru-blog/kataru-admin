import { useGetSession } from '@/entities/user'
import { Editor } from '@/features/editor'
import { Toaster } from '@/shared/ui/sonner'
import dayjs from 'dayjs'
import { useCreateAdminPost, useGetAdminPostById, useUpdateAdminPost } from 'entities/posts'
import { useGetImagesByPostId } from 'entities/images'
import { UserCard } from 'features'
import { Calendar, Eye, Heart, X } from 'lucide-react'
import { useEffect, useState, type ComponentProps, type KeyboardEvent } from 'react'
import { useDebounce } from 'shared/hooks/use-debounce'
import { useRouter } from 'shared/lib/router'
import { toHTMLWithTOC } from 'shared/lib/utils'
import { Badge } from 'shared/ui/badge'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Skeleton } from 'shared/ui/skeleton'
import { Switch } from 'shared/ui/switch'
import { toast } from 'sonner'

export const PostEditor = ({ id }: { id?: string }) => {
    const { data: session } = useGetSession()
    const router = useRouter()
    const isEditMode = !!id
    const { data: existingPost, isLoading } = useGetAdminPostById(id || '')
    const createPost = useCreateAdminPost()
    const updatePost = useUpdateAdminPost()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [isNotice, setIsNotice] = useState(false)
    const [allowComments, setAllowComments] = useState(true)
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [__html, setHtml] = useState('')
    const debouncedContent = useDebounce(content, 100)
    const { data: imagesData } = useGetImagesByPostId(id || 'temp')
    const uploadedImages = imagesData?.data || []

    const copyImageMarkdownText = (imageUrl: string, imageName?: string) => {
        const name = imageName || imageUrl.split('/').pop() || 'image'
        navigator.clipboard.writeText(`![${name}](${imageUrl})`)
        toast.success('이미지 링크가 복사되었습니다')
    }

    const handleThumbnailSelect = (imageUrl: string) => {
        setThumbnailUrl(imageUrl)
        toast.success('썸네일이 설정되었습니다')
    }

    const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error('제목을 입력해주세요')
            return
        }

        if (!content.trim()) {
            toast.error('내용을 입력해주세요')
            return
        }

        try {
            if (isEditMode) {
                await updatePost.mutateAsync({
                    postId: id,
                    data: {
                        title,
                        content,
                        thumbnailUrl: thumbnailUrl || undefined,
                        isNotice,
                        allowComment: allowComments,
                        tags: tags.length > 0 ? tags : undefined,
                    },
                })
                toast.success('포스트가 수정되었습니다')
                router.navigate(`/posts/${id}`)
            } else {
                const result = await createPost.mutateAsync({
                    title,
                    content,
                    thumbnailUrl: thumbnailUrl || undefined,
                    isNotice,
                    allowComment: allowComments,
                    tags: tags.length > 0 ? tags : undefined,
                })
                toast.success(`포스트가 생성되었습니다 (번호: ${result.postNumber})`)
                router.navigate(`/posts/${result.id}`)
            }
        } catch (error) {
            toast.error(isEditMode ? '포스트 수정에 실패했습니다' : '포스트 생성에 실패했습니다')
            console.error('Failed to save post:', error)
        }
    }

    useEffect(() => {
        if (isEditMode && existingPost) {
            setTitle(existingPost.title)
            setContent(existingPost.content)
            setThumbnailUrl(existingPost.thumbnailUrl || '')
            setIsNotice(existingPost.isNotice)
            setAllowComments(existingPost.allowComment)
            setTags(existingPost.tags.map((tag) => tag.name) || [])
        }
    }, [isEditMode, existingPost])

    useEffect(() => {
        toHTMLWithTOC(debouncedContent).then(({ html }) => {
            setHtml(html)
        })
    }, [debouncedContent])

    if (isEditMode && isLoading) {
        return (
            <div className='flex flex-col gap-3.5 p-3.5'>
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-96 w-full' />
            </div>
        )
    }

    return (
        <div className='relative flex flex-col md:flex-row h-svh'>
            <div className='flex flex-col size-full border-r h-svh'>
                <div className='backdrop-blur-sm bg-background/80 border-b border-border px-3 py-0.5 sm:px-3 sm:py-2 flex-wrap'>
                    <Input
                        className='border-none text-pretty text-md md:text-xl font-semibold line-clamp-2 max-h-auto py-5.5 shadow-none'
                        id='title'
                        placeholder='Enter post title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <Editor content={content} setContent={setContent} postId={id || 'temp'} />

                <div className='grid gap-2 border-t p-3.5'>
                    <Label htmlFor='tags'>Tags</Label>
                    <Input
                        id='tags'
                        placeholder='Type a tag and press Enter'
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInput}
                    />
                    {tags.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {tags.map((tag) => (
                                <Badge key={tag} variant='secondary' className='flex items-center gap-1'>
                                    {tag}
                                    <X className='h-3 w-3 cursor-pointer' onClick={() => removeTag(tag)} />
                                </Badge>
                            ))}
                        </div>
                    )}
                    <div className='flex flex-col gap-2'>
                        <section className='flex items-baseline gap-2'>
                            <Label htmlFor='thumbnail'>Images</Label>
                            <span className='text-xs'>이미지를 클릭하면 마크다운이 복사되고, 우클릭하면 썸네일로 설정됩니다.</span>
                        </section>

                        <section className='flex gap-2 items-center h-16 relative overflow-x-auto'>
                            {uploadedImages.length > 0 ? (
                                uploadedImages.map((image) => {
                                    const getBaseUrl = (url: string) => {
                                        const match = url.match(/^(.+?)(?:\/(pc|tablet|mobile|thumbnail|original)\.\w+)?$/)
                                        return match && match[1] ? match[1] : url
                                    }

                                    const baseUrl = getBaseUrl(image.originalUrl)

                                    return (
                                        <div key={image.id} className='relative h-full flex-shrink-0'>
                                            <img
                                                src={image.thumbnailUrl}
                                                alt={image.id}
                                                className={`h-full object-cover cursor-pointer ${
                                                    thumbnailUrl === baseUrl ? 'ring-2 ring-primary' : ''
                                                }`}
                                                onClick={() => copyImageMarkdownText(baseUrl, image.id)}
                                                onContextMenu={(e) => {
                                                    e.preventDefault()
                                                    handleThumbnailSelect(baseUrl)
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='text-xs text-muted-foreground'>업로드된 이미지가 없습니다</div>
                            )}
                        </section>
                    </div>

                    <div className='space-y-4'>
                        <div className='flex items-center space-x-2'>
                            <Switch id='notice' checked={isNotice} onCheckedChange={setIsNotice} />
                            <Label htmlFor='notice'>Mark as Notice</Label>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <Switch id='comments' checked={allowComments} onCheckedChange={setAllowComments} />
                            <Label htmlFor='comments'>Allow Comments</Label>
                        </div>
                    </div>

                    <Button onClick={handleSave} className='w-full' disabled={createPost.isPending || updatePost.isPending}>
                        {createPost.isPending || updatePost.isPending ? '저장 중...' : isEditMode ? '포스트 수정' : '포스트 생성'}
                    </Button>
                </div>
            </div>
            <section className='h-svh w-full border-r border-border md:flex flex-col hidden'>
                <div className='sticky top-0 z-10 backdrop-blur-sm bg-background/80 flex gap-1 items-center justify-between border-b border-border px-3 py-0.5 sm:px-3 sm:py-2 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-md sm:text-xl font-semibold py-2 line-clamp-2 text-pretty'>{title || '제목을 입력해주세요'}</h1>
                    </div>
                    <div className='flex gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-0'>
                        <div className='flex gap-1 items-center'>
                            <Calendar className='size-3' />
                            <span className='text-primary/70'>{dayjs().format('YY.MM.DD')}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Eye className='size-3' />
                            <span className='text-primary/70'>{0}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Heart className='size-3' />
                            <span className='text-primary/70'>{0}</span>
                        </div>
                    </div>
                </div>
                <article className='flex flex-col gap-2 justify-start mx-auto p-7 overflow-y-auto flex-1 min-h-0 w-full'>
                    <div className='prose w-full' dangerouslySetInnerHTML={{ __html }} />
                    <section className='flex flex-col sm:flex-row gap-2 flex-wrap'>
                        {tags.map((tag, idx) => (
                            <Badge variant={'outline'} className='text-xs sm:text-sm py-0.5 px-1 sm:py-1 sm:px-1.5 h-fit rounded' key={tag + idx}>
                                {tag}
                            </Badge>
                        ))}
                    </section>
                </article>
                <div className='border-t border-border mt-5'>
                    <UserCard
                        blogDescription='Example blog description'
                        user={{ ...session?.user, customLinks: [] } as ComponentProps<typeof UserCard>['user']}
                    />
                </div>
            </section>
            <Toaster />
        </div>
    )
}
