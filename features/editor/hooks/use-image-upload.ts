import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useUploadImage } from '@/entities/images'
import { useRouter } from '@/shared/lib/router'

interface UseImageUploadProps {
    editorRef: React.RefObject<HTMLDivElement>
    onImageInsert: (markdown: string) => void
    postId?: string
}

export const useImageUpload = ({ editorRef, onImageInsert, postId }: UseImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const cursorPositionRef = useRef<{ range: Range | null; selection: Selection | null }>({
        range: null,
        selection: null,
    })
    const [isUploading, setIsUploading] = useState(false)
    const uploadImage = useUploadImage()
    const router = useRouter()

    const saveCursorPosition = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) {
            if (editorRef.current) {
                const range = document.createRange()
                range.selectNodeContents(editorRef.current)
                range.collapse(false)
                cursorPositionRef.current = { range, selection: window.getSelection() }
            }
            return
        }

        const range = selection.getRangeAt(0).cloneRange()
        cursorPositionRef.current = { range, selection }
    }

    const restoreCursorPosition = () => {
        const { range, selection } = cursorPositionRef.current
        if (range && selection) {
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }


    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('이미지 파일만 업로드 가능합니다')
            return
        }

        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error('파일 크기는 10MB 이하여야 합니다')
            return
        }

        setIsUploading(true)
        try {
            const currentPostId = postId || (router.query.id as string) || 'temp'
            const result = await uploadImage.mutateAsync({ file, postId: currentPostId })

            if (!result.success || !result.data) {
                throw new Error('Upload failed')
            }

            restoreCursorPosition()

            const markdown = `![${file.name}](${result.data.url})`

            if (editorRef.current) {
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0)
                    range.deleteContents()
                    const textNode = document.createTextNode(markdown)
                    range.insertNode(textNode)
                    range.setStartAfter(textNode)
                    range.setEndAfter(textNode)
                    selection.removeAllRanges()
                    selection.addRange(range)
                } else {
                    editorRef.current.innerText += markdown
                }

                onImageInsert(editorRef.current.innerText)
            }

            toast.success('이미지가 업로드되었습니다')
        } catch (error) {
            console.error('Image upload failed:', error)
            toast.error('이미지 업로드에 실패했습니다')
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleImageButtonClick = () => {
        saveCursorPosition()
        fileInputRef.current?.click()
    }

    return {
        fileInputRef,
        handleFileSelect,
        handleImageButtonClick,
        isUploading,
    }
}