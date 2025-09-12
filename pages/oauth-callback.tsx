import { useEffect, useState, type FC } from 'react'
import { useRouter } from 'shared/lib/router'

export const OAuthCallback: FC = () => {
    const apiURL = process.env.NODE_ENV === 'production' ? 'https://kataru.dev/api' : 'http://localhost:3000/api'
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const response = await fetch(`${apiURL}/auth/get-session`, {
                    credentials: 'include',
                    mode: 'cors',
                })

                if (response.ok) {
                    const session = await response.json()

                    if (session?.user) {
                        router.navigate('/')
                    } else {
                        setError('로그인에 실패했습니다')
                    }
                } else {
                    setError('세션을 확인할 수 없습니다')
                }
            } catch (err) {
                setError('인증 처리 중 오류가 발생했습니다')
            } finally {
                setLoading(false)
            }
        }

        handleCallback()
    }, [router])

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-background'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto'></div>
                    <p className='mt-4 text-foreground/70'>로그인 처리 중...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-background'>
                <div className='text-center'>
                    <p className='text-red-500 font-semibold'>오류</p>
                    <p className='mt-2 text-foreground/70'>{error}</p>
                    <button
                        onClick={() => router.navigate('/login')}
                        className='mt-4 px-4 py-2 bg-foreground text-background rounded-md hover:bg-foreground/90'>
                        다시 시도
                    </button>
                </div>
            </div>
        )
    }

    return null
}
