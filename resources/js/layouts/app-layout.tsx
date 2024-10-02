import { PropsWithChildren } from 'react'

import { FlashMessage } from 'components/flash-message'
import { Footer } from 'components/footer'
import { Navbar } from 'components/navbar'

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className='min-h-svh bg-muted/20'>
            <FlashMessage />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
