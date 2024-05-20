import { RadioGroup } from '@headlessui/react';
import type { FC, ReactNode } from 'react'
import { IconButton } from '~/components/buttons';
import PenIcon from '~/components/icons/Pen';
import CheckIcon from '~/components/icons/Check'

type MenuItemType = { label: string, onEdit?: () => void }

export type MenuItemTypes = { [key: string]: MenuItemType }

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
        <RadioGroup className='border-collapse' value={selected || ''} onChange={(sel) => {
            onSelect(sel)
        }}>
            <RadioGroup.Label>{placeholder}</RadioGroup.Label>
            {Object.keys(menuItems).map((key, idx) => (
                <RadioGroup.Option
                    className={`flex cursor-pointer items-center gap-2 border border-border-main bg-surface-main p-2 text-text-label hover:bg-surface-hover hover:text-text-main ${idx !== 0 ? 'border-t-0' : 'mt-4'}`}
                    key={key}
                    value={key}
                >
                    {({ checked }) => (
                        <>
                            <CheckIcon className={`size-5 ${checked ? 'fill-green-400' : 'fill-text-placeholder'}`} />
                            <span className=''>
                                {menuItems[key].label}
                            </span>
                            {menuItems[key].onEdit && (
                                <IconButton className='ml-auto' name='edit' onClick={(e) => {
                                    e.stopPropagation()
                                    menuItems[key].onEdit!()
                                }}>
                                    <PenIcon className='size-4 fill-text-label hover:fill-text-main' />
                                </IconButton>
                            )}
                        </>
                    )}
                </RadioGroup.Option>
            ))}
        </RadioGroup >
    );
};

export default TemplatePopupMenu;