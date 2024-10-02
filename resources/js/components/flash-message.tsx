import { useEffect } from 'react'

import { toast } from 'sonner'
import { Toaster } from 'ui'

import { usePage } from '@inertiajs/react'

type FlashMessageData = {
    type: string
    message: string
}

export function FlashMessage() {
    const { flash_message } = usePage<{ flash_message: FlashMessageData }>().props
    useEffect(() => {
        if (flash_message && flash_message.message) {
            ;(toast as any)[flash_message.type](flash_message.message)
        }
    }, [flash_message])
    return <Toaster />
}
