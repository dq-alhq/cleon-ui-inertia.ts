import { IconBrandCleon, IconColorSwatch, IconTemplate } from 'cleon-icons'
import { Header } from 'components/header'
import { Logo } from 'components/logo'
import { AppLayout } from 'layouts'
import { Card, Grid, Link } from 'ui'

import { Head } from '@inertiajs/react'

const items = [
    {
        name: 'Cleon UI',
        url: 'https://cleon-ui.vercel.app',
        icon: Logo,
        description:
            'This Cleon UI component library, built with Tailwind CSS and React Aria Component. Read the docs to learn more.'
    },
    {
        name: 'Icons',
        url: 'https://cleon-ui.vercel.app/icons',
        icon: IconBrandCleon,
        description:
            'Icon library for React, perfect for enhancing the visual appeal and user experience of your web applications.'
    },
    {
        name: 'Themes',
        url: 'https://cleon-ui.vercel.app/themes',
        icon: IconColorSwatch,
        description:
            'Craft your own theme with the power of Tailwind CSS and React Aria Component. Head to the docs to learn more.'
    },
    {
        name: 'Blocks',
        url: 'https://cleon-ui.vercel.app/blocks',
        icon: IconTemplate,
        description:
            'Sample blocks for your application. Customize them to suit your needs. Head to the docs to learn more.'
    }
]

export default function Home() {
    return (
        <>
            <Head title='Welcome to Laravel' />
            <Header title='Inertia Typescript' />
            <div className='container'>
                <div className='border border-transparent rounded-lg lg:border-border'>
                    <Link
                        href='https://cleon-ui.vercel.app'
                        target='_blank'
                        className='grid rounded-full place-content-center size-12 outline-1 outline-border'
                    >
                        <Logo className='block size-7' />
                    </Link>
                    <div className='max-w-2xl mb-8'>
                        <div className='mt-6 text-xl sm:text-2xl'>
                            Laravel application with Inertia and React Typescript!
                        </div>
                        <div className='mt-4 text-muted-foreground sm:text-lg'>
                            This is a Laravel application with Inertia and React Typescript with Cleon-UI Integration.
                        </div>
                    </div>

                    <Grid
                        columns={{
                            initial: 1,
                            sm: 2
                        }}
                        gap={4}
                    >
                        <Grid.Collection items={items}>
                            {(item) => (
                                <Grid.Item className='relative' id={item.name}>
                                    <Link className='absolute inset-0 size-full' target='_blank' href={item.url} />
                                    <Card>
                                        <div className='px-6 pt-6'>
                                            <div className='grid border rounded-full size-8 place-content-center'>
                                                <item.icon />
                                            </div>
                                        </div>
                                        <Card.Header>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Description>{item.description}</Card.Description>
                                        </Card.Header>
                                    </Card>
                                </Grid.Item>
                            )}
                        </Grid.Collection>
                    </Grid>
                </div>
            </div>
        </>
    )
}

Home.layout = (page: any) => <AppLayout children={page} />
