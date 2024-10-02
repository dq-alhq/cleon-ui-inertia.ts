import { wait } from '@/lib/utils'
import { FormSetting, ModalProps, User } from '@/types'
import { router, useForm, usePage } from '@inertiajs/react'
import { Button, Description, Form, Modal, TextField } from 'ui'

export default function UserForm({ isOpen, setIsOpen }: ModalProps) {
    const { user, form } = usePage<{ user: User; form: FormSetting }>().props
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: form.method,
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? ''
    })

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault()
        post(form.url, { onSuccess: () => onClose() })
    }

    function onClose() {
        reset()
        setIsOpen(false)
        wait(300).then(() => router.get(route('users.index')))
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Trigger className='sr-only' />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>{form.title}</Modal.Title>
                    <Modal.Description>Fill in the details below</Modal.Description>
                </Modal.Header>
                <Form onSubmit={onSubmit} validationErrors={errors}>
                    <Modal.Body>
                        <TextField
                            type='text'
                            name='name'
                            label='Name'
                            value={data.name}
                            autoFocus
                            onChange={(v) => setData('name', v)}
                            errorMessage={errors.name}
                            isRequired
                        />
                        <TextField
                            type='text'
                            name='username'
                            label='Username'
                            value={data.username}
                            autoFocus
                            onChange={(v) => setData('username', v)}
                            errorMessage={errors.username}
                            isRequired
                        />
                        <TextField
                            type='email'
                            name='email'
                            label='Email'
                            value={data.email}
                            autoFocus
                            onChange={(v) => setData('email', v)}
                            errorMessage={errors.email}
                            isRequired
                        />
                        <Description>
                            By default password is <code>password</code>
                        </Description>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' isDisabled={processing}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
