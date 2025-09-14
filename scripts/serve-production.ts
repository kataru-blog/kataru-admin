import { serve } from 'bun'
import { join } from 'path'

const PORT = process.env.PORT || 10101

const getMimeType = (pathname: string): string => {
    const ext = pathname.split('.').pop()?.toLowerCase()
    switch (ext) {
        case 'js':
        case 'mjs':
            return 'application/javascript'
        case 'css':
            return 'text/css'
        case 'html':
            return 'text/html'
        case 'json':
            return 'application/json'
        case 'png':
            return 'image/png'
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg'
        case 'svg':
            return 'image/svg+xml'
        case 'ico':
            return 'image/x-icon'
        case 'woff':
            return 'font/woff'
        case 'woff2':
            return 'font/woff2'
        case 'ttf':
            return 'font/ttf'
        default:
            return 'application/octet-stream'
    }
}

serve({
    port: PORT,
    async fetch(req) {
        const url = new URL(req.url)
        let pathname = url.pathname

        if (pathname.includes('.')) {
            const filePath = join('./dist', pathname)

            try {
                const file = Bun.file(filePath)
                const exists = await file.exists()

                if (exists) {
                    const mimeType = getMimeType(pathname)
                    return new Response(file, {
                        headers: {
                            'Content-Type': mimeType,
                        },
                    })
                } else {
                    return new Response('Not Found', { status: 404 })
                }
            } catch (error) {
                return new Response('Internal Server Error', { status: 500 })
            }
        }

        return new Response(Bun.file('./dist/index.html'), {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
    error() {
        return new Response(Bun.file('./dist/index.html'), {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
})

console.log(`
🚀 Production server running at http://localhost:${PORT}
📁 Serving files from ./dist directory
🌍 Environment: production
`)
