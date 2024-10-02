import { UserLayout } from 'layouts'
import { Note } from 'ui'

import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }: PageProps) {
    return (
        <>
            <Head title='Dashboard' />

            <Note variant='primary'>Hello, {auth.user.name}!</Note>
        </>
    )
}

Dashboard.layout = (page: any) => <UserLayout children={page} />
