import { PropsWithChildren, ReactNode } from 'react'

import { FlashMessage } from 'components/flash-message'
import { Logo } from 'components/logo'
import { Card } from 'components/ui/card'
import { Link } from 'ui'

interface GuestLayoutProps {
    header?: string | null
    description?: string | ReactNode | null
}

export function GuestLayout({ description = null, header = null, children }: PropsWithChildren<GuestLayoutProps>) {
    return (
        <div className='flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0'>
            <FlashMessage />
            <Link href={route('home')}>
                <Logo className='mx-auto size-8' />
            </Link>

            <div className='w-full max-w-lg mt-10'>
                <Card>
                    <Card.Header>
                        <Card.Title>{header}</Card.Title>
                        <Card.Description>{description}</Card.Description>
                    </Card.Header>
                    <Card.Content>{children}</Card.Content>
                </Card>
            </div>
        </div>
    )
}
