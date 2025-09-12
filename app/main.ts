import { serve } from 'bun'
import html from './index.html'

const server = serve({
    routes: {
        '/*': html,
    },
    development: process.env.NODE_ENV !== 'production' && {
        hmr: true,
        console: true,
    },
    port: 10101,
})

console.log(`🚀 Server running at ${server.url}`)
