import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

const hasRole = (role: string) => {
    const { auth } = usePage<PageProps>().props
    return auth.user.roles?.includes(role)
}

const hasAnyRole = (...roles: string[]) => {
    const { auth } = usePage<PageProps>().props
    return roles.some((role) => auth.user.roles?.includes(role))
}

const hasPermission = (permission: string) => {
    const { auth } = usePage<PageProps>().props
    return auth.user.permissions?.includes(permission)
}

const hasAnyPermission = (...permissions: string[]) => {
    const { auth } = usePage<PageProps>().props
    return permissions.some((permission) => auth.user.permissions?.includes(permission))
}

export { hasAnyPermission, hasAnyRole, hasPermission, hasRole }
