export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://kataru.dev/api' : 'http://localhost:3000/api'

    const isFormData = options?.body instanceof FormData

    const headers: HeadersInit = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...options?.headers,
    }

    const response = await fetch(`${apiUrl}${url}`, {
        ...options,
        credentials: 'include',
        mode: 'cors',
        headers,
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}
