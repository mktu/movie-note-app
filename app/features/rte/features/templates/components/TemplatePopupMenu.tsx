import { RadioGroup } from '@headlessui/react';
import type { FC, ReactNode } from 'react'
import CheckIcon from '~/components/icons/Check'

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
        <RadioGroup className='border-collapse' value={selected} onChange={(sel) => {
            const found = menuItems[sel]
            found && onSelect(found.label)
        }}>
            <RadioGroup.Label>{placeholder}</RadioGroup.Label>
            {Object.values(menuItems).map((item, idx) => (
                <RadioGroup.Option
                    className={`flex cursor-pointer items-center gap-2 border border-border-main bg-surface-main p-2 text-text-label hover:bg-surface-hover hover:text-text-main ${idx !== 0 ? 'border-t-0' : 'mt-4'}`}
                    key={idx}
                    value={item}
                >
                    {({ checked }) => (
                        <>
                            <CheckIcon className={`h-5 w-5 ${checked ? 'fill-green-400' : 'fill-text-placeholder'}`} />
                            <span className=''>
                                {item.label}
                            </span>
                        </>
                    )}
                </RadioGroup.Option>
            ))}
        </RadioGroup >
    );
};

export default TemplatePopupMenu;