import { useGetSession } from '@/entities/user'
import { ChevronLeft, ChevronRight, FileText, LayoutDashboard, LogOut, MessageSquare, PlusCircle, Settings, User } from 'lucide-react'
import { useState, useEffect, type FC, type ReactNode } from 'react'
import { Link, usePathname, useRouter } from 'shared/lib/router'
import { cn } from 'shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar'
import { Button } from 'shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from 'shared/ui/dropdown-menu'

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Posts', href: '/posts', icon: FileText },
    { name: 'Comments', href: '/comments', icon: MessageSquare },
    { name: 'Blog Settings', href: '/blog', icon: Settings },
]

interface LayoutProps {
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    const { data: session, isLoading } = useGetSession()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !session?.user?.id && pathname !== '/login') {
            router.navigate('/login')
        }
    }, [isLoading, session, pathname, router])

    if (pathname === '/login') {
        return <>{children}</>
    }

    return (
        !isLoading && (
            <div className='min-h-svh bg-background'>
                {sidebarOpen && <div className='fixed inset-0 z-40 bg-primary/50 lg:hidden' onClick={() => setSidebarOpen(false)} />}
                <div
                    className={cn(
                        'fixed inset-y-0 left-0 z-50 bg-card border-r transform transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 flex flex-col',
                        collapsed ? 'w-16' : 'w-64',
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    )}>
                    <div className='flex h-15.25 items-center px-3 border-b justify-center'>
                        {!collapsed && (
                            <Link href='/' className='flex items-center gap-2 flex-1'>
                                <div className='size-6 bg-primary rounded flex items-center justify-center'>
                                    <span className='text-primary-foreground text-md font-bold size-5 flex items-center justify-center'>語</span>
                                </div>
                                <h1 className='text-lg font-semibold'>Kataru</h1>
                            </Link>
                        )}

                        <button
                            type='button'
                            onClick={() => setCollapsed(!collapsed)}
                            className={cn(
                                'flex items-center gap-2 rounded-lg p-2 text-sm font-medium',
                                'text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200',
                                collapsed && 'justify-center',
                            )}>
                            {collapsed ? <ChevronRight className='size-4' /> : <ChevronLeft className='size-4' />}
                        </button>
                    </div>

                    <nav className='flex-1 h-full px-2 pt-3'>
                        <ul className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-2 rounded-lg p-2 text-sm font-medium transition-colors duration-200',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                                collapsed && 'justify-start w-fit',
                                            )}>
                                            <item.icon className='size-5 shrink-0' />
                                            {!collapsed && <span className='truncate'>{item.name}</span>}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className='border-t p-2 h-fit'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className={cn('w-full justify-start gap-2 h-auto p-2 hover:bg-accent', collapsed && 'justify-center px-1')}>
                                    <Avatar className='size-7'>
                                        <AvatarImage src={session?.user?.image || 'https://kataru.dev/favicon.ico'} />
                                        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {!collapsed && (
                                        <div className='flex flex-col items-start text-left min-w-0'>
                                            <span className='text-sm font-medium truncate'>{session?.user?.name}</span>
                                            <span className='text-xs text-muted-foreground truncate'>{session?.user?.email}</span>
                                        </div>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-56'>
                                <DropdownMenuItem asChild>
                                    <Link href='/posts/create' className='flex items-center gap-2'>
                                        <PlusCircle className='size-3.5' />새 게시글 작성
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href='/blog' className='flex items-center gap-2'>
                                        <User className='size-3.5' />
                                        나의 정보수정
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='flex items-center gap-2 text-red-600'>
                                    <LogOut className='size-3.5' />
                                    로그아웃
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className={cn('transition-all duration-300', collapsed ? 'lg:pl-16' : 'lg:pl-64')}>
                    <main>{children}</main>
                </div>
            </div>
        )
    )
}
