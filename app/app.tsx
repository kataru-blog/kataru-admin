import { Layout } from '@/features'
import { PostEditor } from '@/pages/post-editor'
import { QueryProvider } from '@/shared/lib/query'
import { Blog, Dashboard, Posts, Comments, Login, OAuthCallback } from 'pages'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Router } from 'shared/lib/router'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

createRoot(rootElement).render(
    <StrictMode>
        <QueryProvider>
            <Router>
                <Route path='/login' element={Login} />
                <Route path='/auth/callback' element={OAuthCallback} />
                <Layout>
                    <Route path='/' element={Dashboard} />
                    <Route path='/posts' element={Posts} />
                    <Route path='/posts/create' element={PostEditor} />
                    <Route path='/posts/edit/:id' element={PostEditor} />
                    <Route path='/comments' element={Comments} />
                    <Route path='/blog' element={Blog} />
                </Layout>
            </Router>
        </QueryProvider>
    </StrictMode>,
)
