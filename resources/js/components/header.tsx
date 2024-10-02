import * as React from 'react'

import { cn } from 'utils'

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('py-6 bg-background sm:py-12 border-b mb-12', className)} {...props}>
            <div className='container'>
                <h1 className='text-xl sm:text-2xl font-semibold tracking-tight'>{props.title}</h1>
            </div>
        </div>
    )
)
Header.displayName = 'Header'

export { Header }
