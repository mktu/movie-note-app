import { Menu } from '@headlessui/react'
import type { FC } from 'react'
import AngleDown from '../icons/AngleDown'

export const Blocks: { [key: string]: { label: string } } = {
    normal: { label: 'Normal' },
    h1: { label: 'Heading 1' },
    h2: { label: 'Heading 2' },
    h3: { label: 'Heading 3' }
}

export type BlockTypes = keyof typeof Blocks


type Props = {
    defaultSelected?: string,
    selected?: string,
    onSelect: (selected: string) => void
}

const Dropdown: FC<Props> = ({
    defaultSelected = 'normal',
    selected,
    onSelect
}) => {
    return (
        <Menu as='div'>
            <Menu.Button className='flex w-full items-center p-2 hover:bg-surface-hover focus:outline-none text-text-label'>
                <span className='mr-1'>{selected ? Blocks[selected].label : Blocks[defaultSelected].label}</span>
                <AngleDown className='h-4 w-4 fill-text-label' />
            </Menu.Button>
            <Menu.Items className="absolute mx-2 w-[128px] rounded shadow border-border-dark bg-white focus:outline-none p-2 z-20 flex flex-col gap-1 text-text-label">
                {Object.keys(Blocks).map((key) => (
                    <Menu.Item key={key} as='div' >
                        {({ active }) => (
                            <button
                                onClick={() => {
                                    onSelect(key)
                                }}
                                className={`${active && 'bg-surface-hover'} w-full flex justify-start`}
                            >
                                {Blocks[key].label}
                            </button>
                        )}
                    </Menu.Item>
                ))}

            </Menu.Items>
        </Menu>
    )
}

export default Dropdown