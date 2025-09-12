import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCreateCustomLink, useDeleteCustomLink, useGetCustomLinks, useReorderCustomLinks, useUpdateCustomLink } from '@/entities/blog'
import { GripVertical, LinkIcon, Plus, Trash2, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from 'shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Skeleton } from 'shared/ui/skeleton'
import { toast } from 'sonner'

interface SortableItemProps {
    link: {
        id: string
        label: string
        url: string
        sortOrder: number
    }
    onEdit: (link: { id: string; label: string; url: string }) => void
    onDelete: (linkId: string) => void
    isDeleting: boolean
    isReordering: boolean
}

const SortableItem = ({ link, onEdit, onDelete, isDeleting, isReordering }: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className='flex items-center justify-between p-3 border rounded-lg bg-background'>
            <div className='flex items-center gap-3'>
                <button className='cursor-move touch-none' {...attributes} {...listeners} disabled={isReordering}>
                    <GripVertical className='size-3.5 text-muted-foreground' />
                </button>
                <div>
                    <div className='font-medium'>{link.label}</div>
                    <div className='text-sm text-muted-foreground'>{link.url}</div>
                </div>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' size='sm' onClick={() => onEdit(link)} disabled={isDeleting || isReordering}>
                    <Edit className='size-3.5' />
                </Button>
                <Button variant='outline' size='sm' onClick={() => onDelete(link.id)} disabled={isDeleting || isReordering}>
                    <Trash2 className='size-3.5' />
                </Button>
            </div>
        </div>
    )
}

export const LinksTab = () => {
    const { data: linksData, isLoading } = useGetCustomLinks()
    const { mutate: createLink, isPending: isCreating } = useCreateCustomLink()
    const { mutate: updateLink, isPending: isUpdating } = useUpdateCustomLink()
    const { mutate: deleteLink, isPending: isDeleting } = useDeleteCustomLink()
    const { mutate: reorderLinks, isPending: isReordering } = useReorderCustomLinks()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingLink, setEditingLink] = useState<{ id: string; label: string; url: string } | null>(null)
    const [formData, setFormData] = useState({ label: '', url: '' })
    const [links, setLinks] = useState<any[]>([])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    useEffect(() => {
        if (linksData?.links) {
            setLinks(linksData.links)
        }
    }, [linksData])

    const handleAddLink = () => {
        if (!formData.label.trim() || !formData.url.trim()) return

        if (editingLink) {
            updateLink(
                { linkId: editingLink.id, data: formData },
                {
                    onSuccess: () => {
                        toast.success('Link has been updated.')
                        setIsDialogOpen(false)
                        setEditingLink(null)
                        setFormData({ label: '', url: '' })
                    },
                    onError: () => {
                        toast.error('Failed to update link.')
                    },
                },
            )
        } else {
            createLink(formData, {
                onSuccess: () => {
                    toast.success('Link has been added.')
                    setIsDialogOpen(false)
                    setFormData({ label: '', url: '' })
                },
                onError: () => {
                    toast.error('Failed to add link.')
                },
            })
        }
    }

    const handleEditLink = (link: { id: string; label: string; url: string }) => {
        setEditingLink(link)
        setFormData({ label: link.label, url: link.url })
        setIsDialogOpen(true)
    }

    const handleDeleteLink = (linkId: string) => {
        deleteLink(linkId, {
            onSuccess: () => {
                toast.success('Link has been deleted.')
            },
            onError: () => {
                toast.error('Failed to delete link.')
            },
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex((item) => item.id === active.id)
            const newIndex = links.findIndex((item) => item.id === over.id)

            const newLinks = arrayMove(links, oldIndex, newIndex)
            setLinks(newLinks)

            const linkOrders = newLinks.map((link, index) => ({
                id: link.id,
                sortOrder: index,
            }))

            reorderLinks(
                { linkOrders },
                {
                    onSuccess: () => {
                        toast.success('Links order has been updated.')
                    },
                    onError: () => {
                        toast.error('Failed to reorder links.')

                        setLinks(linksData?.links || [])
                    },
                },
            )
        }
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
                <div className='flex items-center justify-between'>
                    <Skeleton className='h-8 w-48' />
                    <Skeleton className='h-10 w-32' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='h-16 w-full' />
                    <Skeleton className='h-16 w-full' />
                </div>
            </div>
        )
    }

    const sortedLinks = [...links].sort((a, b) => a.sortOrder - b.sortOrder)

    return (
        <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <LinkIcon className='size-3.5' />
                    <h2 className='text-xl font-semibold'>Custom Links</h2>
                </div>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) {
                            setEditingLink(null)
                            setFormData({ label: '', url: '' })
                        }
                    }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className='size-3.5' />
                            Add Link
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingLink ? 'Edit' : 'Add'} Custom Link</DialogTitle>
                            <DialogDescription>{editingLink ? 'Edit your navigation link' : 'Add a new navigation link'}</DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-3.5 py-3.5'>
                            <div className='grid gap-2'>
                                <Label htmlFor='link-label'>Label</Label>
                                <Input
                                    id='link-label'
                                    placeholder='GitHub'
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='link-url'>URL</Label>
                                <Input
                                    id='link-url'
                                    placeholder='https://github.com/username'
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddLink} disabled={isCreating || isUpdating || !formData.label.trim() || !formData.url.trim()}>
                                {isCreating || isUpdating ? 'Saving...' : editingLink ? 'Update Link' : 'Add Link'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sortedLinks.map((link) => link.id)} strategy={verticalListSortingStrategy}>
                    <div className='flex flex-col gap-2'>
                        {sortedLinks.map((link) => (
                            <SortableItem
                                key={link.id}
                                link={link}
                                onEdit={handleEditLink}
                                onDelete={handleDeleteLink}
                                isDeleting={isDeleting}
                                isReordering={isReordering}
                            />
                        ))}
                        {links.length === 0 && <p className='text-muted-foreground text-center py-3.5'>No custom links configured</p>}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}
