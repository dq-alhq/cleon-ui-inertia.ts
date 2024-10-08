import { cn } from '@/lib/utils'
import { router, usePage } from '@inertiajs/react'
import React from 'react'
import { type Key } from 'react-aria-components'
import { SearchField, Select } from 'ui'

const PerPages = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
]

interface Props {
    className?: string
}

interface PageOptions {
    per_page: number
    search: string
}

export default function PageOptions({ className }: Props) {
    const { page_options } = usePage<{ page_options: PageOptions }>().props

    const [perPage, setPerPage] = React.useState<Key>(page_options.per_page || 10)
    const [search, setSearch] = React.useState<string>(page_options.search || '')

    function handlePerPage(value: Key) {
        setPerPage(value)
        if (search.length === 0)
            router.get(route(route().current() as any), { per_page: value }, { preserveState: true })
        else router.get(route(route().current() as any), { q: search, per_page: value }, { preserveState: true })
    }

    function handleSearch(value: string) {
        setSearch(value)
        if (perPage === 10) router.get(route(route().current() as any), { q: value }, { preserveState: true })
        else router.get(route(route().current() as any), { q: value, per_page: perPage }, { preserveState: true })
    }

    return (
        <div className={cn('flex mb-4 gap-2 items-center justify-between flex-row', className)}>
            <Select
                className='w-fit'
                aria-label='Per Page'
                items={PerPages}
                selectedKey={perPage}
                onSelectionChange={handlePerPage}
            >
                {(item) => (
                    <Select.Item id={item.value} textValue={item.label}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <SearchField aria-label='Search' value={search} onChange={handleSearch} />
        </div>
    )
}
