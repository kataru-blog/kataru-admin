import { Bold, Code, Image, Italic, Link, Redo, Strikethrough, Underline, Undo } from 'lucide-react'
import { useState, type FC } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { flushSync } from 'react-dom'
import { getCursorPosition } from './utils/get-cursor-position'
import { detectMarkdownStyle, type MarkdownStyles } from './utils/detect-markdown-style'
import { useWrapSelection } from './hooks/use-wrap-selection'
import { useLink } from './hooks/use-link'
import { useHistory } from './hooks/use-history'
import { useContentEditable } from './hooks/use-content-editable'
import { useKeyboardHandler } from './hooks/use-keyboard-handler'
import { useShortcuts } from './hooks/use-shortcuts'
import { useImageUpload } from './hooks/use-image-upload'
import { EditorButton } from './editor-button'

interface EditorProps {
    content: string
    setContent: (content: string) => void
    postId?: string
}

export const Editor: FC<EditorProps> = ({ content, setContent, postId }) => {
    const [styles, setStyles] = useState<MarkdownStyles>({
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikethrough: false,
        isCode: false,
        isLink: false,
    })
    const [isComposing, setIsComposing] = useState(false)

    const { addToHistory, handleUndo, handleRedo, handleKeyboardShortcuts } = useHistory(content)

    const updateCursorStyles = () => {
        if (!editorRef.current) return

        const position = getCursorPosition(editorRef.current)
        const text = editorRef.current.innerText
        const detectedStyles = detectMarkdownStyle(text, position)

        setStyles(detectedStyles)
    }

    const { editorRef, handleInput, handleBlur, handlePaste } = useContentEditable({
        content,
        onContentChange: setContent,
        onHistoryAdd: addToHistory,
        onCursorUpdate: updateCursorStyles,
    })

    const handleCompositionStart = () => {
        setIsComposing(true)
    }

    const handleCompositionEnd = () => {
        setIsComposing(false)

        if (editorRef.current) {
            const text = editorRef.current.innerText
            setContent(text)
            updateCursorStyles()
        }
    }

    const { wrapSelection } = useWrapSelection(editorRef, (text) => {
        flushSync(() => {
            setContent(text)
            addToHistory(text, true)
        })
        updateCursorStyles()
    })

    const { handleLink } = useLink(editorRef, (text) => {
        flushSync(() => {
            setContent(text)
            addToHistory(text, true)
        })
        updateCursorStyles()
    })

    const handleUndoClick = () => {
        const text = handleUndo()
        if (text !== null) {
            setContent(text)
            if (editorRef.current) {
                editorRef.current.innerText = text
            }
        }
    }

    const handleRedoClick = () => {
        const text = handleRedo()
        if (text !== null) {
            setContent(text)
            if (editorRef.current) {
                editorRef.current.innerText = text
            }
        }
    }

    const { handleKeyDown, handleKeyUp, handleClick } = useKeyboardHandler({
        editorRef,
        onContentChange: setContent,
        onCursorUpdate: updateCursorStyles,
        onUndo: handleUndoClick,
        onRedo: handleRedoClick,
        onHistoryAdd: addToHistory,
        handleKeyboardShortcuts,
        isComposing,
    })

    const handleShortcutKeyDown = useShortcuts({
        onBold: () => wrapSelection('**', '**', styles.isBold),
        onItalic: () => wrapSelection('*', '*', styles.isItalic),
        onUnderline: () => wrapSelection('<u>', '</u>', styles.isUnderline),
        onStrikethrough: () => wrapSelection('~~', '~~', styles.isStrikethrough),
        onUndo: handleUndoClick,
        onRedo: handleRedoClick,
        isComposing,
    })

    const { fileInputRef, handleFileSelect, handleImageButtonClick, isUploading } = useImageUpload({
        editorRef,
        onImageInsert: (text) => {
            flushSync(() => {
                setContent(text)
                addToHistory(text, true)
            })
            updateCursorStyles()
        },
        postId,
    })

    const handleCombinedKeyDown = (e: React.KeyboardEvent) => {
        handleShortcutKeyDown(e.nativeEvent)

        handleKeyDown(e)
    }

    return (
        <Fragment>
            <div className='flex items-center border-b'>
                <EditorButton icon={Undo} onClick={handleUndoClick} />
                <EditorButton icon={Redo} onClick={handleRedoClick} />
                <EditorButton icon={Bold} onClick={() => wrapSelection('**', '**', styles.isBold)} isActive={styles.isBold} />
                <EditorButton icon={Italic} onClick={() => wrapSelection('*', '*', styles.isItalic)} isActive={styles.isItalic} />
                <EditorButton icon={Underline} onClick={() => wrapSelection('<u>', '</u>', styles.isUnderline)} isActive={styles.isUnderline} />
                <EditorButton
                    icon={Strikethrough}
                    onClick={() => wrapSelection('~~', '~~', styles.isStrikethrough)}
                    isActive={styles.isStrikethrough}
                />
                <EditorButton icon={Code} onClick={() => wrapSelection('```', '```', styles.isCode)} isActive={styles.isCode} />
                <EditorButton icon={Link} onClick={handleLink} isActive={styles.isLink} />
                <EditorButton icon={Image} onClick={handleImageButtonClick} disabled={isUploading} />
            </div>
            <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            <article className='flex gap-2 justify-center mx-auto p-7 overflow-y-auto size-full'>
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className='prose size-full outline-none whitespace-pre-wrap'
                    onInput={handleInput}
                    onBlur={handleBlur}
                    onKeyDown={handleCombinedKeyDown}
                    onKeyUp={handleKeyUp}
                    onPaste={handlePaste}
                    onClick={handleClick}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                />
            </article>
        </Fragment>
    )
}
