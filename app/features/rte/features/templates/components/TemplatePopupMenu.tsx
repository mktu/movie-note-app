import { Menu } from '@headlessui/react';
import type { FC, ReactNode } from 'react'
import AngleDown from '~/components/icons/AngleDown'

type MenuItemTypes = { [key: string]: { label: string } }

type Props = {
    selected?: string,
    menuItems: MenuItemTypes,
    onSelect: (selected: string) => void,
    placeholder?: string | ReactNode
}

const TemplatePopupMenu: FC<Props> = ({
    selected,
    menuItems,
    onSelect,
    placeholder
}) => {
    return (
        <Menu as='div' >
            <Menu.Button className='flex w-[290px] items-center p-2 text-text-label hover:bg-surface-hover'>
                <span className='mr-1'>{selected ? menuItems[selected].label : placeholder}</span>
                <AngleDown className='ml-auto h-4 w-4 fill-text-label' />
            </Menu.Button>
            <Menu.Items className="absolute z-20 flex w-[290px] flex-col gap-1 rounded border-border-dark bg-white text-text-label shadow">
                {Object.keys(menuItems).map((key) => (
                    <Menu.Item key={key} as='button' onClick={() => {
                        onSelect(key)
                    }}
                    >
                        {({ active }) => (
                            <span
                                className={`${active && 'bg-surface-hover'} flex w-full justify-start p-2`}
                            >
                                {menuItems[key].label}
                            </span>
                        )}
                    </Menu.Item>
                ))}

            </Menu.Items>
        </Menu>
    );
};

export default TemplatePopupMenu;