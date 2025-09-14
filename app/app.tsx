import { Layout } from '@/features'
import { PostEditor } from '@/pages/post-editor'
import { PostDetail } from '@/pages/post-detail'
import { QueryProvider } from '@/shared/lib/query'
import { Blog, Dashboard, Posts, Comments, Login, OAuthCallback } from 'pages'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Router, Routes } from 'shared/lib/router'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

createRoot(rootElement).render(
    <StrictMode>
        <QueryProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={Login} />
                    <Route path='/auth/callback' element={OAuthCallback} />
                </Routes>
                <Layout>
                    <Routes>
                        <Route path='/' element={Dashboard} />
                        <Route path='/posts' element={Posts} />
                        <Route path='/posts/create' element={PostEditor} />
                        <Route path='/posts/:id/edit' element={PostEditor} />
                        <Route path='/posts/:id' element={PostDetail} />
                        <Route path='/comments' element={Comments} />
                        <Route path='/blog' element={Blog} />
                    </Routes>
                </Layout>
            </Router>
        </QueryProvider>
    </StrictMode>,
)
