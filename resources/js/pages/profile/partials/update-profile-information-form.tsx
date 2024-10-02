import { Button, Card, Form, Link, TextField } from 'ui'

import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'

interface Props {
    mustVerifyEmail: boolean
    status?: string
}

export function UpdateProfileInformationForm({ mustVerifyEmail, status }: Props) {
    const { auth } = usePage<PageProps>().props
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name ?? '',
        username: auth.user.username ?? '',
        email: auth.user.email ?? ''
    })

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        patch(route('profile.update'), {
            preserveScroll: true
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Profile Information</Card.Title>
                <Card.Description>Update your account's profile information and email address.</Card.Description>
            </Card.Header>
            <Card.Content>
                <Form validationErrors={errors} onSubmit={submit} className='space-y-4'>
                    <TextField
                        id='name'
                        label='Name'
                        type='text'
                        value={data.name}
                        className='mt-1'
                        onChange={(v) => setData('name', v)}
                        isRequired
                        errorMessage={errors.name}
                        autoFocus
                        autoComplete='name'
                    />
                    <TextField
                        id='username'
                        label='Username'
                        type='text'
                        value={data.username}
                        className='mt-1'
                        onChange={(v) => setData('username', v)}
                        isRequired
                        errorMessage={errors.username}
                        autoFocus
                        autoComplete='username'
                    />
                    <TextField
                        id='email'
                        type='email'
                        label='Email'
                        value={data.email}
                        className='mt-1'
                        onChange={(v) => setData('email', v)}
                        isRequired
                        errorMessage={errors.email}
                        autoComplete='email'
                    />

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className='mt-2 text-sm'>
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    variant='secondary'
                                    routerOptions={{
                                        method: 'post'
                                    }}
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className='mt-2 text-sm font-medium text-success'>
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className='flex items-center gap-4'>
                        <Button type='submit' isDisabled={processing}>
                            Save
                        </Button>
                        {recentlySuccessful && <p className='text-sm text-muted-foreground'>Saved.</p>}
                    </div>
                </Form>
            </Card.Content>
        </Card>
    )
}
