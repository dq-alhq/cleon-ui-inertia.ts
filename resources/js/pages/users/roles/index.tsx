import DeleteModal from '@/components/delete-modal'
import Paginator from '@/components/paginator'
import {
    Badge,
    Button,
    buttonVariants,
    Card,
    Description,
    Heading,
    Link,
    Menu,
    Table,
    Toggle,
    Tooltip
} from '@/components/ui'
import { UserLayout } from '@/layouts'
import { Paginate, Role } from '@/types'
import { router } from '@inertiajs/react'
import { IconDotsVertical, IconEdit, IconHelpCircle, IconKey, IconTrash } from 'cleon-icons'
import React from 'react'
import RoleForm from './form'

interface Props {
    roles: Paginate & { data: Role[] }
    models: string[]
}

const Permissions = [{ name: 'create' }, { name: 'read' }, { name: 'update' }, { name: 'delete' }]

export default function RoleIndex({ roles, models }: Props) {
    const [openForm, setOpenForm] = React.useState(
        route().current() === 'roles.create' || route().current() === 'roles.edit'
    )

    const [openDelete, setOpenDelete] = React.useState(false)
    const [deleteRoute, setDeleteRoute] = React.useState('')
    function deleteRole(id: number) {
        setDeleteRoute(route('roles.destroy', id))
        setOpenDelete(true)
    }

    function togglePermission(role: Role, model: string, permission: string) {
        router.put(
            route('roles.permissions', role.id),
            { permission: model + '-' + permission },
            { preserveState: true }
        )
    }

    return (
        <>
            <RoleForm isOpen={openForm} setIsOpen={setOpenForm} />
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <Heading className='text-xl'>Roles</Heading>
                    <Description>Manage roles</Description>
                </div>
                <div>
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('roles.create')}>
                        Create New Role
                    </Link>
                </div>
            </div>
            <Card>
                <Table aria-label='Roles'>
                    <Table.Header className='text-center'>
                        <Table.Column className='w-3' isRowHeader>
                            #
                        </Table.Column>
                        <Table.Column>Role</Table.Column>
                        <Table.Column>
                            Permissions{' '}
                            <Tooltip delay={0}>
                                <Tooltip.Trigger>
                                    <IconHelpCircle />
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                    Every permission allowed user with roles to act as super-admin
                                </Tooltip.Content>
                            </Tooltip>
                        </Table.Column>
                        <Table.Column children></Table.Column>
                    </Table.Header>
                    <Table.Body renderEmptyState={() => <p className='py-2 text-lg text-center'>No roles found</p>}>
                        {roles.data.length > 0 &&
                            roles.data.map((role, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell className='text-center'>{i + 1}</Table.Cell>
                                    <Table.Cell>
                                        <Badge>{role.name}</Badge>
                                    </Table.Cell>
                                    <Table.Cell className='space-y-1'>
                                        {models.map((model, i) => (
                                            <fieldset
                                                key={i}
                                                className='flex flex-row gap-2 p-2 border rounded-lg w-fit'
                                            >
                                                <legend className='ml-2 font-semibold uppercase'>{model}</legend>
                                                {Permissions.map((permission, i) => (
                                                    <Toggle
                                                        key={i}
                                                        isDisabled={role.name === 'admin'}
                                                        variant='solid'
                                                        isSelected={role.permissions.some(
                                                            (p) => p.name === `${model}-${permission.name}`
                                                        )}
                                                        onChange={() => togglePermission(role, model, permission.name)}
                                                    >
                                                        {permission.name}
                                                    </Toggle>
                                                ))}
                                            </fieldset>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell className='text-right'>
                                        {role.name !== 'admin' && (
                                            <>
                                                <DeleteModal
                                                    route={deleteRoute}
                                                    isOpen={openDelete}
                                                    setIsOpen={setOpenDelete}
                                                />
                                                <Menu>
                                                    <Button variant='ghost' size='icon'>
                                                        <IconDotsVertical />
                                                    </Button>
                                                    <Menu.Content aria-label='User actions' placement='bottom end'>
                                                        <Menu.Item href={route('roles.edit', role.id)}>
                                                            <IconEdit />
                                                            Edit
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <IconKey />
                                                            Permissions
                                                        </Menu.Item>
                                                        <Menu.Item onAction={() => deleteRole(role.id)} isDanger>
                                                            <IconTrash />
                                                            Delete
                                                        </Menu.Item>
                                                    </Menu.Content>
                                                </Menu>
                                            </>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </Card>
            <Paginator links={roles.links} meta={roles.meta} only={['roles']} />
        </>
    )
}

RoleIndex.layout = (page: React.ReactNode) => <UserLayout children={page} />
