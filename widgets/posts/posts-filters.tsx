import { SearchInput } from '@/features'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui/select'

interface PostsFiltersProps {
    searchKeyword: string
    setSearchKeyword: (value: string) => void
    sortBy: 'createdAt' | 'title'
    setSortBy: (value: 'createdAt' | 'title') => void
    sortOrder: 'asc' | 'desc'
    setSortOrder: (value: 'asc' | 'desc') => void
}

export const PostsFilters = ({ searchKeyword, setSearchKeyword, sortBy, setSortBy, sortOrder, setSortOrder }: PostsFiltersProps) => {
    return (
        <div className='flex flex-col gap-3.5 md:flex-row md:items-center'>
            <SearchInput searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} placeholder='Search posts by title, summary, or tags...' />

            <div className='flex gap-3.5'>
                <Select value={sortBy} onValueChange={(value: 'createdAt' | 'title') => setSortBy(value)}>
                    <SelectTrigger className='w-full md:w-1/2 min-w-32'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='createdAt'>Date</SelectItem>
                        <SelectItem value='title'>Title</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                    <SelectTrigger className='w-full md:w-1/2 min-w-32'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='desc'>Descending</SelectItem>
                        <SelectItem value='asc'>Ascending</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
