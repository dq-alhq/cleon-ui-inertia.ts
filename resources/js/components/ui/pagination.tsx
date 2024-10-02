import * as React from 'react'

import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconDotsHorizontal } from 'cleon-icons'
import {
    ListBox,
    ListBoxItem,
    Section,
    Separator,
    type ListBoxItemProps,
    type ListBoxProps,
    type SectionProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'

import { buttonVariants } from './button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role='navigation'
        aria-label='pagination'
        className={cn('mx-auto flex w-full justify-center gap-1', className)}
        {...props}
    />
)

const PaginationSection = <T extends object>({ className, ...props }: SectionProps<T>) => (
    <Section {...props} className={cn('flex h-9 sm:h-10 gap-1', className)} />
)

const PaginationList = <T extends object>({ className, ...props }: ListBoxProps<T>) => {
    const ariaLabel = props['aria-label'] || 'Pagination'
    return (
        <ListBox
            orientation='horizontal'
            aria-label={ariaLabel}
            layout='grid'
            className={cn('flex flex-row items-center gap-1', className)}
            {...props}
        />
    )
}

const renderListItem = (
    props: ListBoxItemProps & {
        textValue?: string
        ariaCurrent?: string | undefined
        isDisabled?: boolean
        className?: string
    },
    children: React.ReactNode
) => <ListBoxItem {...props}>{children}</ListBoxItem>

interface PaginationItemProps extends ListBoxItemProps {
    children?: React.ReactNode
    className?: string
    variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'dark' | 'success' | 'outline' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
    shape?: 'square' | 'circle'
    isCurrent?: boolean
    role?: 'label' | 'separator' | 'ellipsis' | 'default' | 'last' | 'first' | 'previous' | 'next'
}

const PaginationItem = ({
    role = 'default',
    size = 'icon',
    shape = 'square',
    variant = 'outline',
    className,
    isCurrent,
    children,
    ...props
}: PaginationItemProps) => {
    const textValue =
        typeof children === 'string' ? children : typeof children === 'number' ? children.toString() : undefined

    const renderPaginationIndicator = (indicator: React.ReactNode) =>
        renderListItem(
            {
                textValue: role,
                ariaCurrent: isCurrent ? 'page' : undefined,
                isDisabled: isCurrent,
                className: cn(
                    buttonVariants({
                        variant: 'outline',
                        size: 'icon',
                        className:
                            'focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:text-foreground [&>[data-slot=icon]]:text-primary focus-visible:ring-4 focus-visible:ring-primary/20'
                    }),
                    className
                ),
                ...props
            },
            indicator
        )

    switch (role) {
        case 'label':
            return renderListItem(
                {
                    textValue: textValue,
                    className: cn('h-9 sm:h-10 px-3.5 grid place-content-center', className),
                    ...props
                },
                children
            )
        case 'separator':
            return renderListItem(
                {
                    textValue: 'Separator',
                    className: 'h-9 sm:h-10 grid place-content-center',
                    ...props
                },
                <Separator
                    orientation='vertical'
                    className='h-5 w-[1.5px] bg-muted-foreground rotate-[14deg] shrink-0'
                />
            )
        case 'ellipsis':
            return renderListItem(
                {
                    textValue: 'More pages',
                    className: cn(
                        'flex items-center justify-center focus-visible:border-primary rounded-lg border border-transparent focus:outline-none size-9 sm:size-10 focus-visible:bg-primary/10 focus-visible:text-foreground [&>[data-slot=icon]]:text-primary focus-visible:ring-4 focus-visible:ring-primary/20',
                        className
                    ),
                    ...props
                },
                <span aria-hidden className={cn('flex size-9 sm:size-10 items-center justify-center', className)}>
                    <IconDotsHorizontal className='size-5 text-muted-foreground' />
                </span>
            )
        case 'previous':
            return renderPaginationIndicator(<IconChevronLeft />)
        case 'next':
            return renderPaginationIndicator(<IconChevronRight />)
        case 'first':
            return renderPaginationIndicator(<IconChevronsLeft />)
        case 'last':
            return renderPaginationIndicator(<IconChevronsRight />)
        default:
            return renderListItem(
                {
                    textValue: textValue,
                    ariaCurrent: isCurrent ? 'page' : undefined,
                    isDisabled: isCurrent,
                    className: cn(
                        buttonVariants({
                            variant: isCurrent ? 'primary' : variant,
                            size,
                            className:
                                'focus-visible:border-primary cursor-pointer focus-visible:bg-primary/10 focus-visible:text-foreground [&>[data-slot=icon]]:text-primary focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-80'
                        }),
                        className
                    ),
                    ...props
                },
                children
            )
    }
}

Pagination.Item = PaginationItem
Pagination.List = PaginationList
Pagination.Section = PaginationSection

export { Pagination }
