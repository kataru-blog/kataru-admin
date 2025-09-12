import { useCreateCustomDomain, useDeleteCustomDomain, useGetCustomDomains, useUpdateCustomDomain } from '@/entities/blog'
import { Edit, Globe, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Skeleton } from 'shared/ui/skeleton'
import { toast } from 'sonner'

export const DomainsTab = () => {
    const { data: domainsData, isLoading } = useGetCustomDomains()
    const { mutate: createDomain, isPending: isCreating } = useCreateCustomDomain()
    const { mutate: updateDomain, isPending: isUpdating } = useUpdateCustomDomain()
    const { mutate: deleteDomain, isPending: isDeleting } = useDeleteCustomDomain()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingDomain, setEditingDomain] = useState<{ id: string; domain: string } | null>(null)
    const [domainInput, setDomainInput] = useState('')

    const handleAddDomain = () => {
        if (!domainInput.trim()) return

        if (editingDomain) {
            updateDomain(
                { domainId: editingDomain.id, data: { domain: domainInput } },
                {
                    onSuccess: () => {
                        toast.success('Domain has been updated.')
                        setIsDialogOpen(false)
                        setEditingDomain(null)
                        setDomainInput('')
                    },
                    onError: () => {
                        toast.error('Failed to update domain.')
                    },
                },
            )
        } else {
            createDomain(
                { domain: domainInput },
                {
                    onSuccess: () => {
                        toast.success('Domain has been added.')
                        setIsDialogOpen(false)
                        setDomainInput('')
                    },
                    onError: () => {
                        toast.error('Failed to add domain.')
                    },
                },
            )
        }
    }

    const handleEditDomain = (domain: { id: string; domain: string }) => {
        setEditingDomain(domain)
        setDomainInput(domain.domain)
        setIsDialogOpen(true)
    }

    const handleDeleteDomain = (domainId: string) => {
        deleteDomain(domainId, {
            onSuccess: () => {
                toast.success('Domain has been deleted.')
            },
            onError: () => {
                toast.error('Failed to delete domain.')
            },
        })
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

    const domains = domainsData?.domains || []

    return (
        <div className='flex flex-col gap-3.5 p-3.5 border rounded-lg bg-card'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Globe className='size-3.5' />
                    <h2 className='text-xl font-semibold'>Custom Domains</h2>
                </div>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) {
                            setEditingDomain(null)
                            setDomainInput('')
                        }
                    }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className='size-3.5' />
                            Add Domain
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingDomain ? 'Edit' : 'Add'} Custom Domain</DialogTitle>
                            <DialogDescription>
                                {editingDomain ? 'Edit your custom domain' : 'Add a new custom domain for your blog'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-3.5 py-3.5'>
                            <div className='grid gap-2'>
                                <Label htmlFor='domain'>Domain</Label>
                                <Input id='domain' placeholder='example.com' value={domainInput} onChange={(e) => setDomainInput(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddDomain} disabled={isCreating || isUpdating || !domainInput.trim()}>
                                {isCreating || isUpdating ? 'Saving...' : editingDomain ? 'Update Domain' : 'Add Domain'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='flex flex-col gap-2'>
                {domains.map((domain) => (
                    <div key={domain.id} className='flex items-center justify-between p-3 border rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <Globe className='size-3.5 text-muted-foreground' />
                            <span>{domain.domain}</span>
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={() => handleEditDomain({ id: domain.id, domain: domain.domain })}
                                disabled={isDeleting}>
                                <Edit className='size-3.5' />
                            </Button>
                            <Button variant='outline' size='sm' onClick={() => handleDeleteDomain(domain.id)} disabled={isDeleting}>
                                <Trash2 className='size-3.5' />
                            </Button>
                        </div>
                    </div>
                ))}
                {domains.length === 0 && <p className='text-muted-foreground text-center py-3.5'>No custom domains configured</p>}
            </div>
        </div>
    )
}
