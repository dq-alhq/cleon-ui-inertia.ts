import { wait } from '@/lib/utils'
import { FormSetting, ModalProps, Role } from '@/types'
import { router, useForm, usePage } from '@inertiajs/react'
import { Button, Form, Modal, TextField } from 'ui'

export default function RoleForm({ isOpen, setIsOpen }: ModalProps) {
    const { role, form } = usePage<{ role: Role; form: FormSetting }>().props
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: form.method,
        name: role.name ?? ''
    })

    function onSubmit(e: { preventDefault: () => void }) {
        e.preventDefault()
        post(form.url, { onSuccess: () => onClose() })
    }

    function onClose() {
        reset()
        setIsOpen(false)
        wait(300).then(() => router.get(route('roles.index')))
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
