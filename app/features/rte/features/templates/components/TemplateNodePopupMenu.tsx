import { Menu } from '@headlessui/react';
import type { FC, ReactNode } from 'react'
import AngleDown from '~/components/icons/AngleDown'


type Props = {
    selected?: string,
    menuItems: string[],
    onSelect: (selectedIndex: number) => void,
    placeholder?: string | ReactNode
}

const TemplateNodePopupMenu: FC<Props> = ({
    selected,
    menuItems,
    onSelect,
    placeholder
}) => {
    return (
        <Menu as='div' >
            <Menu.Button className={`flex w-[290px] items-center p-2 ${selected ? 'text-text-main' : 'text-text-label'} border-b border-border-main hover:bg-surface-hover`}>
                <span className='mr-1'>{selected ? selected : placeholder}</span>
                <AngleDown className='ml-auto h-4 w-4 fill-text-label' />
            </Menu.Button>
            <Menu.Items className="absolute z-20 flex w-[290px] flex-col gap-1 rounded border-border-dark bg-white text-text-label shadow">
                {menuItems.map((item, index) => (
                    <Menu.Item key={index} as='button' onClick={() => {
                        onSelect(index)
                    }}
                    >
                        {({ active }) => (
                            <span
                                className={`${active && 'bg-surface-hover'} flex w-full justify-start p-2`}
                            >
                                {item}
                            </span>
                        )}
                    </Menu.Item>
                ))}

            </Menu.Items>
        </Menu>
    );
};

export default TemplateNodePopupMenu;