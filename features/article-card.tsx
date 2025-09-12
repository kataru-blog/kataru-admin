import type { Post, User } from 'entities/types'
import { Eye, Heart } from 'lucide-react'
import type { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar'
import { Card } from 'shared/ui/card'

interface ArticleCardProps extends Pick<Post, 'id' | 'thumbnailUrl' | 'title' | 'summary' | 'createdAt'> {
    user?: Partial<User>
    viewCount: number
    likeCount: number
}

export const ArticleCard: FC<ArticleCardProps> = ({ id, thumbnailUrl, title, summary, createdAt, user, viewCount, likeCount }) => {
    return (
        <Card
            key={id}
            className='overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 hover:border-border py-0 min-h-32'>
            <div className='flex h-full flex-col md:flex-row'>
                <div className='relative aspect-video overflow-hidden w-full md:w-35 xl:w-65 rounded-lg bg-muted h-full'>
                    <img
                        src={thumbnailUrl || 'https://kataru.dev/favicon.ico'}
                        alt={title}
                        className='absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                </div>

                <div className='flex-1 min-w-0 flex flex-col justify-between p-3'>
                    <div>
                        <h3 className='font-bold text-lg md:text-xl line-clamp-1 text-balance group-hover:text-primary transition-colors'>{title}</h3>
                        <p className='text-muted-foreground text-md md:text-base mb-4 line-clamp-2 leading-relaxed'>{summary || ''}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={user?.image || 'https://kataru.dev/favicon.ico'} />
                                <AvatarFallback className='text-sm bg-muted'>{user?.nickname?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-foreground'>{user?.nickname}</span>
                                <span className='text-xs text-muted-foreground'>{new Date(createdAt).toLocaleDateString('ko-KR')}</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-3.5 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                                <Eye className='size-3.5' />
                                <span>{viewCount.toLocaleString()}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <Heart className='size-3.5' />
                                <span>{likeCount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
