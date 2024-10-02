import type { SVGProps } from 'react'

import { cn } from 'utils'

interface Props extends SVGProps<SVGSVGElement> {
    className?: string
}

export const Logo = (props: Props) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 375 375' className={cn('size-4', props.className)} {...props}>
        <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='75'
            d='M-45.159 -1.481L104.841 -1.481'
            transform='rotate(-60 215.663 -37.014)'
        ></path>
        <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='75'
            d='M-45.159 -1.481L84.841 -1.481'
            transform='rotate(-60 329.394 -53.885)'
        ></path>
        <ellipse
            fill='currentColor'
            strokeWidth='0'
            rx='38.46'
            ry='38.46'
            transform='translate(63.862 296.071)'
        ></ellipse>
        <ellipse
            fill='currentColor'
            strokeWidth='0'
            rx='38.46'
            ry='38.46'
            transform='translate(311.138 296.071)'
        ></ellipse>
    </svg>
)
