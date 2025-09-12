import { Github } from 'lucide-react'
import { useState, type FC } from 'react'

export const Login: FC = () => {
    const apiURL = process.env.NODE_ENV === 'production' ? 'https://kataru.dev/api' : 'http://localhost:3000/api'
    const origin = process.env.NODE_ENV === 'production' ? 'https://admin.kataru.dev' : 'http://localhost:10101'
    const [isLoading, setIsLoading] = useState(false)

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${apiURL}/auth/sign-in/social`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    origin,
                    provider,
                    callbackURL: `${origin}/auth/callback`,
                }),
                credentials: 'include',
                mode: 'cors',
            })

            if (response.ok) {
                const data = (await response.json()) as { url?: string; redirect?: string }
                if (data.url) {
                    window.location.href = data.url
                } else if (data.redirect) {
                    window.location.href = data.redirect
                } else {
                }
            } else {
                console.error('OAuth error:', response.status)
            }
        } catch (error) {
            console.error('OAuth request failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='flex items-center justify-center min-h-screen bg-background'>
            <div className='w-full max-w-md p-8 space-y-6 bg-background border border-secondary rounded-lg'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-foreground'>로그인</h1>
                    <p className='mt-2 text-sm text-foreground/70'>계정에 로그인하세요</p>
                </div>

                <div className='space-y-3'>
                    <button
                        type='button'
                        onClick={() => handleSocialLogin('github')}
                        disabled={isLoading}
                        className='flex items-center justify-center w-full px-4 py-2 text-background bg-foreground rounded-md hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed'>
                        <Github className='w-5 h-5 mr-2' />
                        GitHub으로 계속하기
                    </button>

                    <button
                        type='button'
                        onClick={() => handleSocialLogin('google')}
                        disabled={isLoading}
                        className='flex items-center justify-center w-full px-4 py-2 text-foreground bg-background border border-secondary rounded-md hover:bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed'>
                        <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                            <path
                                fill='currentColor'
                                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                            />
                            <path
                                fill='currentColor'
                                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                            />
                            <path
                                fill='currentColor'
                                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                            />
                            <path
                                fill='currentColor'
                                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                            />
                        </svg>
                        Google로 계속하기
                    </button>
                </div>
            </div>
        </section>
    )
}
