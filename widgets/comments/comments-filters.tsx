import { SearchInput } from '@/features'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import type { FC } from 'react'

interface CommentsFiltersProps {
    searchKeyword: string
    setSearchKeyword: (value: string) => void
    sortOrder: 'asc' | 'desc'
    setSortOrder: (value: 'asc' | 'desc') => void
}

export const CommentsFilters: FC<CommentsFiltersProps> = ({ searchKeyword, setSearchKeyword, sortOrder, setSortOrder }) => {
    return (
        <div className='flex flex-col gap-3.5 md:flex-row md:items-center'>
            <SearchInput searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} placeholder='Search comments by content...' />
            <div className='flex gap-3.5'>
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                    <SelectTrigger className='w-32'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='desc'>Newest First</SelectItem>
                        <SelectItem value='asc'>Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}