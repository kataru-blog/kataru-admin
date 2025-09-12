import { useGetUserInfo, useUpdateUserInfo } from '@/entities/user'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Skeleton } from 'shared/ui/skeleton'
import { toast } from 'sonner'

export const ProfileTab = () => {
    const { data: userInfo, isLoading } = useGetUserInfo()
    const { mutate: updateUserInfo, isPending } = useUpdateUserInfo()

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        image: '',
    })

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name || '',
                nickname: userInfo.nickname || '',
                image: userInfo.image || '',
            })
        }
    }, [userInfo])

    const handleSave = () => {
        updateUserInfo(formData, {
            onSuccess: () => {
                toast.success('Profile has been updated.')
            },
            onError: () => {
                toast.error('Failed to update profile.')
            },
        })
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
                <Skeleton className='h-8 w-48' />
                <div className='flex items-center gap-3.5'>
                    <Skeleton className='size-20 rounded-full' />
                    <Skeleton className='h-10 flex-1' />
                </div>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
            <div className='flex items-center gap-2'>
                <User className='size-3.5' />
                <h2 className='text-xl font-semibold'>User Profile</h2>
            </div>

            <div className='flex flex-col gap-3.5'>
                <div className='flex items-center gap-3.5'>
                    <Avatar className='size-20'>
                        <AvatarImage src={formData.image} />
                        <AvatarFallback>
                            <User className='size-8' />
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 flex flex-col gap-2'>
                        <div className='grid gap-2'>
                            <Label htmlFor='user-image'>Profile Image URL</Label>
                            <Input
                                id='user-image'
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                disabled={isPending}
                            />
                        </div>
                    </div>
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='user-name'>Name</Label>
                    <Input
                        id='user-name'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isPending}
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='user-nickname'>Nickname</Label>
                    <Input
                        id='user-nickname'
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        disabled={isPending}
                    />
                </div>
            </div>
            <Button className='w-fit' onClick={handleSave} disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
        </div>
    )
}
