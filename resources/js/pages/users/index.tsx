import DeleteModal from '@/components/delete-modal'
import PageOptions from '@/components/page-options'
import Paginator from '@/components/paginator'
import { Avatar, Badge, Button, buttonVariants, Card, Description, Heading, Link, Menu, Table } from '@/components/ui'
import { UserLayout } from '@/layouts'
import { PageProps, Paginate, Role, User } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { IconDotsVertical, IconEdit, IconKey, IconTrash } from 'cleon-icons'
import React from 'react'
import UserForm from './form'

interface Props {
    users: Paginate & { data: User[] }
    roles: Role[]
}

export default function UserIndex({ users, roles }: Props) {
    const { auth } = usePage<PageProps>().props

    const [openForm, setOpenForm] = React.useState(
        route().current() === 'users.create' || route().current() === 'users.edit'
    )

    const [openDelete, setOpenDelete] = React.useState(false)
    const [deleteRoute, setDeleteRoute] = React.useState('')

    function deleteUser(id: number) {
        setDeleteRoute(route('users.destroy', id))
        setOpenDelete(true)
    }

    console.log(users)

    return (
        <>
            <UserForm isOpen={openForm} setIsOpen={setOpenForm} />
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <Heading className='text-xl'>Users</Heading>
                    <Description>Manage users</Description>
                </div>
                <div className='flex flex-row gap-2'>
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('users.create')}>
                        Create New User
                    </Link>
                </div>
            </div>
            <PageOptions />
            <Card>
                <Table aria-label='Users'>
                    <Table.Header className='text-center'>
                        <Table.Column className='w-3' isRowHeader>
                            #
                        </Table.Column>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Role</Table.Column>
                        <Table.Column children></Table.Column>
                    </Table.Header>
                    <Table.Body
                        renderEmptyState={() => <div className='py-2 text-lg text-center'>No users found.</div>}
                    >
                        {users.data.length > 0 &&
                            users.data.map((user, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell className='text-center'>{i + 1}</Table.Cell>
                                    <Table.Cell className='flex items-center gap-x-3'>
                                        <Avatar src={user.avatar} />
                                        <div className='grid'>
                                            <span className='font-medium text-foreground'>{user.name}</span>
                                            <span className='text-xs'>{user.email}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className='space-x-1'>
                                        {user.roles &&
                                            user.roles.length > 0 &&
                                            user.roles.map((role) => <Badge key={role}>{role}</Badge>)}
                                    </Table.Cell>
                                    <Table.Cell className='text-right'>
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
                                                <Menu.Item href={route('users.edit', user.id)}>
                                                    <IconEdit />
                                                    Edit
                                                </Menu.Item>
                                                {auth.user.id !== user.id && (
                                                    <>
                                                        <Menu.Item isDanger onAction={() => deleteUser(user.id)}>
                                                            <IconTrash />
                                                            Delete
                                                        </Menu.Item>
                                                        <Menu.Sub>
                                                            <Menu.Item>
                                                                <IconKey />
                                                                Assign/Remove Role
                                                            </Menu.Item>
                                                            <Menu.Content
                                                                placement='end'
                                                                aria-label='User roles'
                                                                items={roles}
                                                            >
                                                                {(item) => (
                                                                    <Menu.Item
                                                                        key={item.id}
                                                                        className='capitalize'
                                                                        onAction={() =>
                                                                            router.put(
                                                                                route('users.roles', [user.id, item.id])
                                                                            )
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </Menu.Item>
                                                                )}
                                                            </Menu.Content>
                                                        </Menu.Sub>
                                                    </>
                                                )}
                                            </Menu.Content>
                                        </Menu>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </Card>
            <Paginator meta={users.meta} links={users.links} only={['users']} />
        </>
    )
}

UserIndex.layout = (page: React.ReactNode) => <UserLayout children={page} />
