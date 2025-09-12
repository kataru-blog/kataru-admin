import { SiteHeader } from '@/features'
import { CommentsFilters, CommentsList } from '@/widgets/comments'
import { useState, type FC } from 'react'

export const Comments: FC = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className='flex flex-col gap-3.5 p-3.5'>
            <SiteHeader title='Comments Management' description='Manage user comments on your posts' />
            <CommentsFilters
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <CommentsList 
                searchKeyword={searchKeyword} 
                sortOrder={sortOrder}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}