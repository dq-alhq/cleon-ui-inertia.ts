import React, { useEffect } from 'react'

import { GuestLayout } from 'layouts'
import { Button, buttonVariants, Checkbox, Form, Link, TextField } from 'ui'

import { Head, useForm } from '@inertiajs/react'

interface LoginProps {
    status: string
    canResetPassword: boolean
    canRegister: boolean
}

export default function Login(args: LoginProps) {
    const { status, canResetPassword, canRegister } = args
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: ''
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        post(route('login'))
    }

    return (
        <>
            <Head title='Log in' />

            {status && <div className='mb-4 text-sm font-medium text-green-600 dark:text-green-400'>{status}</div>}

            <Form validationErrors={errors} onSubmit={submit} className='space-y-4'>
                <TextField
                    label='Email'
                    type='email'
                    name='email'
                    value={data.email}
                    autoComplete='username'
                    autoFocus
                    onChange={(v) => setData('email', v)}
                    errorMessage={errors.email}
                    isRequired
                />
                <TextField
                    type='password'
                    name='password'
                    label='Password'
                    value={data.password}
                    autoComplete='current-password'
                    onChange={(v) => setData('password', v)}
                    errorMessage={errors.password}
                    isRequired
                />

                <div className='flex items-center justify-between'>
                    <Checkbox name='remember' onChange={(v) => setData('remember', v as any)}>
                        Remember me
                    </Checkbox>
                    {canResetPassword && (
                        <Link href='/forgot-password' className='text-sm text-foreground hover:underline'>
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className='flex items-center justify-between'>
                    {canRegister && (
                        <Link href={route('register')} className={buttonVariants({ variant: 'outline' })}>
                            Register
                        </Link>
                    )}

                    <Button isDisabled={processing} type='submit'>
                        Log in
                    </Button>
                </div>
            </Form>
        </>
    )
}

Login.layout = (page: React.ReactNode) => {
    return <GuestLayout header='Login' description='Log in to your account.' children={page} />
}
