import { SiteHeader } from '@/features'
import { useRouter } from '@/shared/lib/router'
import { Button } from '@/shared/ui/button'
import { PostsFilters, PostsList } from '@/widgets/posts'
import { Plus } from 'lucide-react'
import { useState, type FC } from 'react'

export const Posts: FC = () => {
    const router = useRouter()
    const [searchKeyword, setSearchKeyword] = useState('')
    const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('createdAt')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className='flex flex-col gap-3.5 p-3.5'>
            <SiteHeader title='Posts Management' description='Manage your blog posts'>
                <Button onClick={() => router.navigate('/posts/create')}>
                    <Plus className='size-5' />
                    Create Post
                </Button>
            </SiteHeader>
            <PostsFilters
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <PostsList 
                searchKeyword={searchKeyword} 
                sortBy={sortBy} 
                sortOrder={sortOrder}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
