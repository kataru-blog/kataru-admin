import type {
    DashboardSummary,
    ChartDataPoint,
    PostWithStats,
    AdminPostWithStats,
    AdminCommentWithPost,
    BlogInfoResponse,
    CustomDomainsListResponse,
    CustomLinksListResponse,
    UserInfoResponse,
    Tag,
    Comment,
} from '@/entities/types'

// Dashboard Mock Data
export const mockDashboardSummary: DashboardSummary = {
    blogId: 'blog-1',
    totalPosts: 156,
    totalViews: 45230,
    totalLikes: 3420,
    todayViews: 234,
    todayLikes: 18,
}

export const mockChartData: ChartDataPoint[] = [
    { period: '2024-01-01', views: 1200, likes: 45 },
    { period: '2024-01-02', views: 1350, likes: 52 },
    { period: '2024-01-03', views: 980, likes: 38 },
    { period: '2024-01-04', views: 1580, likes: 67 },
    { period: '2024-01-05', views: 1420, likes: 59 },
    { period: '2024-01-06', views: 1680, likes: 73 },
    { period: '2024-01-07', views: 1890, likes: 82 },
]

export const mockTopPosts: PostWithStats[] = [
    {
        id: 'post-1',
        blogId: 'blog-1',
        postNumber: 1,
        title: 'Getting Started with Next.js',
        content: 'Complete guide to Next.js...',
        thumbnailUrl: 'https://blog.gumyo.net/favicon.ico',
        summary: 'Learn the basics of Next.js framework',
        isNotice: false,
        allowComment: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        blog: {
            id: 'blog-1',
            userId: 'user-1',
            title: 'Tech Blog',
            description: 'A blog about technology',
            faviconUrl: 'https://blog.gumyo.net/favicon.ico',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        viewCount: 2340,
        likeCount: 89,
    },
    {
        id: 'post-2',
        blogId: 'blog-1',
        postNumber: 2,
        title: 'Advanced React Patterns',
        content: 'Deep dive into React patterns...',
        thumbnailUrl: 'https://blog.gumyo.net/favicon.ico',
        summary: 'Advanced React development techniques',
        isNotice: false,
        allowComment: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        blog: {
            id: 'blog-1',
            userId: 'user-1',
            title: 'Tech Blog',
            description: 'A blog about technology',
            faviconUrl: 'https://blog.gumyo.net/favicon.ico',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        viewCount: 1890,
        likeCount: 76,
    },
]

// Posts Mock Data
export const mockAdminPosts: AdminPostWithStats[] = [
    {
        id: 'post-1',
        blogId: 'blog-1',
        postNumber: 1,
        title: 'Getting Started with Next.js',
        content: 'Complete guide to Next.js development...',
        thumbnailUrl: 'https://blog.gumyo.net/favicon.ico',
        summary: 'Learn the basics of Next.js framework',
        isNotice: false,
        allowComment: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        blog: {
            id: 'blog-1',
            userId: 'user-1',
            title: 'Tech Blog',
            description: 'A blog about technology',
            faviconUrl: 'https://blog.gumyo.net/favicon.ico',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        tags: [
            { id: 'tag-1', name: 'Next.js' },
            { id: 'tag-2', name: 'React' },
        ],
        viewCount: 2340,
        likeCount: 89,
        commentCount: 23,
    },
    {
        id: 'post-2',
        blogId: 'blog-1',
        postNumber: 2,
        title: 'Advanced React Patterns',
        content: 'Deep dive into React patterns and best practices...',
        thumbnailUrl: 'https://blog.gumyo.net/favicon.ico',
        summary: 'Advanced React development techniques',
        isNotice: false,
        allowComment: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        blog: {
            id: 'blog-1',
            userId: 'user-1',
            title: 'Tech Blog',
            description: 'A blog about technology',
            faviconUrl: 'https://blog.gumyo.net/favicon.ico',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        tags: [
            { id: 'tag-2', name: 'React' },
            { id: 'tag-3', name: 'JavaScript' },
        ],
        viewCount: 1890,
        likeCount: 76,
        commentCount: 15,
    },
]

// Comments Mock Data
export const mockAdminComments: AdminCommentWithPost[] = [
    {
        id: 'comment-1',
        postId: 'post-1',
        userId: 'user-1',
        content: 'Great article! Very helpful for beginners.',
        isSecret: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        post: {
            id: 'post-1',
            postNumber: 1,
            title: 'Getting Started with Next.js',
        },
        user: {
            id: 'user-1',
            name: 'john_doe',
            image: '/placeholder.svg?height=40&width=40',
        },
    },
    {
        id: 'comment-2',
        postId: 'post-1',
        userId: 'user-2',
        content: 'Could you add more examples?',
        isSecret: false,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        post: {
            id: 'post-1',
            postNumber: 1,
            title: 'Getting Started with Next.js',
        },
        user: {
            id: 'user-2',
            name: 'jane_smith',
            image: '/placeholder.svg?height=40&width=40',
        },
    },
]

// Blog Mock Data
export const mockBlogInfo: BlogInfoResponse = {
    id: 'blog-1',
    userId: 'user-1',
    title: 'Tech Blog',
    description: 'A blog about modern web development and technology trends',
    faviconUrl: 'https://blog.gumyo.net/favicon.ico',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
}

export const mockCustomDomains: CustomDomainsListResponse = {
    domains: [
        {
            id: 'domain-1',
            blogId: 'blog-1',
            domain: 'myblog.com',
            createdAt: new Date('2024-01-01'),
        },
        {
            id: 'domain-2',
            blogId: 'blog-1',
            domain: 'www.myblog.com',
            createdAt: new Date('2024-01-01'),
        },
    ],
}

export const mockCustomLinks: CustomLinksListResponse = {
    links: [
        {
            id: 'link-1',
            userId: 'user-1',
            url: 'https://github.com/myusername',
            label: 'GitHub',
            sortOrder: 1,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        {
            id: 'link-2',
            userId: 'user-1',
            url: 'https://twitter.com/myusername',
            label: 'Twitter',
            sortOrder: 2,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
    ],
}

export const mockUserInfo: UserInfoResponse = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    nickname: 'johndoe',
    emailVerified: true,
    image: '/placeholder.svg?height=100&width=100',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
}
