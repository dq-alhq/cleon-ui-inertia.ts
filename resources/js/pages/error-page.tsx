import { Note } from 'ui'

export default function ErrorPage({ status }: { status: string }) {
    const title = {
        503: 'Service Unavailable',
        500: 'Server Error',
        404: 'Page Not Found',
        403: 'Forbidden'
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.'
    }[status]

    return (
        <div className='container flex items-center justify-center w-full min-h-screen bg-background text-foreground'>
            <div className='flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl'>
                <h1 className='font-bold text-7xl text-danger'>{status}</h1>
                <h4 className='mb-4 text-2xl font-bold text-danger'>{title}</h4>
                <Note variant='danger' title={title}>
                    {description}
                </Note>
            </div>
        </div>
    )
}
