import { UserLayout } from 'layouts'

import { Head } from '@inertiajs/react'

import { DeleteUserForm, UpdatePasswordForm, UpdateProfileInformationForm } from './partials'

interface Props {
    mustVerifyEmail: boolean
    status?: string
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <>
            <Head title='Profile' />
            <div className='space-y-4'>
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                <UpdatePasswordForm />
                <DeleteUserForm />
            </div>
        </>
    )
}

Edit.layout = (page: any) => <UserLayout children={page} />
