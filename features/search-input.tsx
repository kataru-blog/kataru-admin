import { Input } from 'shared/ui/input'
import { Search } from 'lucide-react'
import { type FC } from 'react'

interface SearchInputProps {
    searchKeyword: string
    setSearchKeyword: (searchKeyword: string) => void
    placeholder: string
}

export const SearchInput: FC<SearchInputProps> = ({ searchKeyword, setSearchKeyword, placeholder }) => {
    return (
        <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder={placeholder} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className='pl-10' />
        </div>
    )
}
