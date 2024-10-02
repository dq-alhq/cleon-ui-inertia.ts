import { IconChevronDown, IconDashboard, IconLogout, IconSettings } from 'cleon-icons'
import { Logo } from 'components/logo'
import { ThemeSwitcher } from 'components/theme-switcher'
import { Avatar, Button, Menu, Topbar } from 'ui'

import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

export function Navbar() {
    return (
        <>
            <Topbar>
                <Topbar.Navigation>
                    <Topbar.Brand href='/'>
                        <Logo />
                    </Topbar.Brand>
                    <Topbar.Link active={route().current('home')} href='/'>
                        Home
                    </Topbar.Link>
                    <Topbar.Link active={route().current('about')} href='/about'>
                        Contact
                    </Topbar.Link>
                </Topbar.Navigation>
                <Topbar.Right>
                    <UserMenu />
                </Topbar.Right>
            </Topbar>
        </>
    )
}

const UserMenu = () => {
    const { auth } = usePage<PageProps>().props

    return (
        <div className='flex gap-1'>
            {auth.user ? (
                <Menu>
                    <Menu.Trigger aria-label='Open menu'>
                        <Avatar status='success' size='md' src={auth.user.avatar} className='size-8' />
                    </Menu.Trigger>
                    <Menu.Content showArrow placement='bottom end' className='min-w-56'>
                        <Menu.Header separator className='relative'>
                            <div className='absolute right-2 top-2'>
                                <ThemeSwitcher />
                            </div>
                            <div>{auth.user.name}</div>
                            <div className='pr-10 text-sm font-normal truncate text-muted-foreground whitespace-nowrap'>
                                {auth.user.email}
                            </div>
                        </Menu.Header>
                        <Menu.Item href={route('dashboard')}>
                            <IconDashboard />
                            Dashboard
                        </Menu.Item>
                        <Menu.Item href={route('profile.edit')}>
                            <IconSettings />
                            Settings
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item routerOptions={{ method: 'post' }} href={route('logout')} isDanger>
                            <IconLogout />
                            Logout
                        </Menu.Item>
                    </Menu.Content>
                </Menu>
            ) : (
                <div className='flex items-center justify-center gap-2'>
                    <ThemeSwitcher />
                    <Menu>
                        <Button variant='outline'>
                            Login
                            <IconChevronDown />
                        </Button>
                        <Menu.Content showArrow placement='bottom end' className='w-40'>
                            <Menu.Item href={route('login')}>Login</Menu.Item>
                            <Menu.Item href={route('register')}>Register</Menu.Item>
                        </Menu.Content>
                    </Menu>
                </div>
            )}
        </div>
    )
}
