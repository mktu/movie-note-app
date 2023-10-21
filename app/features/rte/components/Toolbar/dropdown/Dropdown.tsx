import { Menu } from '@headlessui/react'
import type { FC } from 'react'
import AngleDown from '~/components/icons/AngleDown'

export type MenuItemTypes = { [key: string]: { label: string } }

type Props = {
    defaultSelected?: string,
    selected?: string,
    menuItems: MenuItemTypes,
    onSelect: (selected: string) => void,
    label?: string
}

const Dropdown: FC<Props> = ({
    defaultSelected,
    selected,
    onSelect,
    menuItems,
    label
}) => {
    return (
        <Menu as='div'>
            <Menu.Button className='flex w-full items-center p-2 text-text-label hover:bg-surface-hover focus:outline-none'>
                <span className='mr-1'>{label ? label : selected ? menuItems[selected].label : defaultSelected ? menuItems[defaultSelected].label : ''}</span>
                <AngleDown className='h-4 w-4 fill-text-label' />
            </Menu.Button>
            <Menu.Items className="absolute z-20 mx-2 flex w-[128px] flex-col gap-1 rounded border-border-dark bg-white p-2 text-text-label shadow focus:outline-none">
                {Object.keys(menuItems).map((key) => (
                    <Menu.Item key={key} as='div' >
                        {({ active }) => (
                            <button
                                onClick={() => {
                                    onSelect(key)
                                }}
                                className={`${active && 'bg-surface-hover'} flex w-full justify-start`}
                            >
                                {menuItems[key].label}
                            </button>
                        )}
                    </Menu.Item>
                ))}

            </Menu.Items>
        </Menu>
    )
}

export default Dropdown