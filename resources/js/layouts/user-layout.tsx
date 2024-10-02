'use client'

import React, { PropsWithChildren } from 'react'

import { IconChevronDown, IconDashboard, IconHome, IconLogout, IconMenu, IconSettings, IconUsers } from 'cleon-icons'
import { Avatar, Button, Link, Menu, Sidebar, Topbar } from 'ui'

import { FlashMessage } from '@/components/flash-message'
import { Logo } from '@/components/logo'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { useMediaQuery } from '@/lib/utils'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { hasRole } from 'permission'

export function UserLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props
    const sidebarItems = [
        {
            icon: IconDashboard,
            name: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            permission: true
        },
        {
            icon: IconSettings,
            name: 'Profile Setting',
            href: route('profile.edit'),
            active: route().current('profile.edit'),
            permission: true
        },
        {
            icon: IconUsers,
            name: 'Users',
            href: route('users.index'),
            active: route().current('users.*') || route().current('roles.*') || route().current('permissions.*'),
            permission: hasRole('admin'),
            subItems: [
                { name: 'List', href: route('users.index'), active: route().current('users.index') },
                { name: 'Roles', href: route('roles.index'), active: route().current('roles.index') }
            ]
        }
    ]
    const [openSidebar, setOpenSidebar] = React.useState(false)

    const isDesktop = useMediaQuery('(min-width: 1024px)')
    React.useEffect(() => {
        if (!isDesktop) setOpenSidebar(false)
    }, [route().current()])
    return (
        <>
            <FlashMessage />
            <div className='flex flex-col min-h-screen lg:grid lg:grid-cols-[auto_1fr]'>
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}>
                    <Sidebar.Header>
                        <Link className='flex items-center gap-x-2 py-0.5' href='/'>
                            <Logo className='size-4' />
                            <strong>{import.meta.env.VITE_APP_NAME}</strong>
                        </Link>
                    </Sidebar.Header>
                    <Sidebar.Content>
                        <Sidebar.Section title='Dashboard' items={sidebarItems}>
                            {sidebarItems.map(
                                (item: any) =>
                                    item.permission && (
                                        <Sidebar.Item
                                            key={item.name}
                                            id={item.name}
                                            textValue={item.name}
                                            active={item.active}
                                            icon={item.icon}
                                            href={item.href}
                                        >
                                            {item.subItems &&
                                                item.subItems.map((item: any, i: number) => (
                                                    <Sidebar.Item
                                                        key={i}
                                                        textValue={item.name}
                                                        id={item.name}
                                                        href={item.href}
                                                        active={item.active}
                                                    />
                                                ))}
                                        </Sidebar.Item>
                                    )
                            )}
                        </Sidebar.Section>
                    </Sidebar.Content>
                    <Sidebar.Footer className='items-center hidden lg:flex lg:flex-row'>
                        <Menu>
                            <Button variant='ghost' aria-label='Profile' className='flex justify-start w-full group'>
                                <Avatar status='success' size='md' src={auth.user?.avatar} className='size-8' />
                                <span className='ml-2'>{auth.user?.name}</span>
                                <IconChevronDown className='absolute transition-transform right-3 group-pressed:rotate-180' />
                            </Button>
                            <Menu.Content placement='top' className='min-w-[--trigger-width]'>
                                <Menu.Item href={route('profile.edit')}>
                                    <IconSettings />
                                    Profile Settings
                                </Menu.Item>
                                <Menu.Item routerOptions={{ method: 'post' }} isDanger href={route('logout')}>
                                    <IconLogout />
                                    Logout
                                </Menu.Item>
                            </Menu.Content>
                        </Menu>
                    </Sidebar.Footer>
                </Sidebar>
                <main className='relative flex flex-col'>
                    <Topbar>
                        <Topbar.Navigation isResponsive={false}>
                            <Topbar.Link href='/' textValue='Home'>
                                <IconHome /> Home
                            </Topbar.Link>
                            <Topbar.Link active={route().current('dashboard')} href='/dashboard' textValue='Dashboard'>
                                <IconDashboard /> Dashboard
                            </Topbar.Link>
                        </Topbar.Navigation>
                        <Button
                            className='lg:hidden'
                            size='icon'
                            variant='outline'
                            onPress={() => setOpenSidebar(!openSidebar)}
                        >
                            <IconMenu />
                        </Button>
                        <Logo className='size-8 lg:hidden' />
                        <Topbar.Right>
                            <ThemeSwitcher />
                        </Topbar.Right>
                    </Topbar>
                    <div className='p-4 md:p-8'>{children}</div>
                </main>
            </div>
        </>
    )
}
