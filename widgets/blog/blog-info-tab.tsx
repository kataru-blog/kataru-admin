import { useGetBlogInfo, useUpdateBlogInfo } from '@/entities/blog'
import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Skeleton } from 'shared/ui/skeleton'
import { Textarea } from 'shared/ui/textarea'
import { toast } from 'sonner'

export const BlogInfoTab = () => {
    const { data: blogInfo, isLoading } = useGetBlogInfo()
    const { mutate: updateBlogInfo, isPending } = useUpdateBlogInfo()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        faviconUrl: '',
    })

    useEffect(() => {
        if (blogInfo) {
            setFormData({
                title: blogInfo.title || '',
                description: blogInfo.description || '',
                faviconUrl: blogInfo.faviconUrl || '',
            })
        }
    }, [blogInfo])

    const handleSave = () => {
        updateBlogInfo(formData, {
            onSuccess: () => {
                toast.success('Blog settings have been updated.')
            },
            onError: () => {
                toast.error('Failed to update blog settings.')
            },
        })
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-20 w-full' />
                <Skeleton className='h-10 w-full' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
            <div className='flex items-center gap-2'>
                <Settings className='size-3.5' />
                <h2 className='text-xl font-semibold'>Blog Information</h2>
            </div>

            <div className='flex flex-col gap-3.5'>
                <div className='grid gap-2'>
                    <Label htmlFor='blog-title'>Blog Title</Label>
                    <Input
                        id='blog-title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        disabled={isPending}
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='blog-description'>Description</Label>
                    <Textarea
                        id='blog-description'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        disabled={isPending}
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='blog-favicon'>Favicon URL</Label>
                    <Input
                        id='blog-favicon'
                        value={formData.faviconUrl}
                        onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                        disabled={isPending}
                    />
                </div>
                <Button className='w-fit' onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Blog Settings'}
                </Button>
            </div>
        </div>
    )
}
