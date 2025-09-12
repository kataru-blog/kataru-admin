import { SiteHeader } from '@/features'
import { BlogInfoTab, DomainsTab, LinksTab, ProfileTab } from '@/widgets/blog'
import type { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shared/ui/tabs'

export const Blog: FC = () => {
    return (
        <div className='flex flex-col gap-3.5 p-3.5'>
            <SiteHeader title='Blog' description='Manage your blog settings' />

            <Tabs defaultValue='blog'>
                <TabsList className='w-full [&>*]:w-full'>
                    <TabsTrigger value='blog'>Blog Info</TabsTrigger>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='domains'>Domains</TabsTrigger>
                    <TabsTrigger value='links'>Links</TabsTrigger>
                </TabsList>

                <TabsContent value='blog'>
                    <BlogInfoTab />
                </TabsContent>

                <TabsContent value='profile'>
                    <ProfileTab />
                </TabsContent>

                <TabsContent value='domains'>
                    <DomainsTab />
                </TabsContent>

                <TabsContent value='links'>
                    <LinksTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
