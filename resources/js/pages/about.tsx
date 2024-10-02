import React from 'react'

import { Header } from 'components/header'
import { AppLayout } from 'layouts'

import { Head } from '@inertiajs/react'

export default function About() {
    return (
        <>
            <Head title='About Us' />
            <Header title='About Us' />
            <div className='container'>{/* Your about page content goes here. */}</div>
        </>
    )
}

About.layout = (page: React.ReactNode) => <AppLayout children={page} />
