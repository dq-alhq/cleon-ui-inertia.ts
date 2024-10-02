import { Config } from 'ziggy-js'

interface Role {
    id: number
    name: string
    users: number
    permissions: Permission[]
}

interface Permission {
    id: number
    name: string
}

interface Paginate {
    meta: {
        from: number
        to: number
        total: number
        current_page: number
        last_page: number
        path: string
        per_page: number
        links: {
            active: boolean
            label: string
            url: string | null
        }[]
    }
    links: {
        first: string | null
        last: string | null
        next: string | null
        prev: string | null
    }
}

export interface User {
    id: number
    name: string
    username: string
    email: string
    email_verified_at?: string
    avatar?: string
    created_at: string
    roles?: string[]
    permissions?: string[]
}

export interface FormSetting {
    method: 'post' | 'put'
    title: string
    url: string
}

export interface ModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
    ziggy: Config & { location: string }
}
