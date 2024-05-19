import { Transition } from '@headlessui/react'
import type { FC } from 'react'

type Props = Parameters<typeof Transition>[0]

const ValidationTransition: FC<Props> = ({ ...props }: any) => (
    <Transition
        as={'div'}
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        {...props}
    />
)

export default ValidationTransition
