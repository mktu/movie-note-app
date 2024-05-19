import type { FC, ReactNode } from 'react'
import CheckIcon from '~/components/icons/Check'
import { RadioGroup } from '@headlessui/react'


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
        <RadioGroup className='border-collapse' value={selected} onChange={(sel) => {
            onSelect(menuItems.findIndex(val => val === sel))
        }}>
            <RadioGroup.Label>{placeholder}</RadioGroup.Label>
            {menuItems.map((item, idx) => (
                <RadioGroup.Option
                    className={`flex cursor-pointer items-center gap-2 border border-border-main bg-surface-main p-2 text-text-label hover:bg-surface-hover hover:text-text-main ${idx !== 0 ? 'border-t-0' : 'mt-4'}`}
                    key={idx}
                    value={item}
                >
                    {({ checked }) => (
                        <>
                            <CheckIcon className={`size-5 ${checked ? 'fill-green-400' : 'fill-text-placeholder'}`} />
                            <span className=''>
                                {item}
                            </span>
                        </>
                    )}
                </RadioGroup.Option>
            ))}
        </RadioGroup >
    );
};

export default TemplateNodePopupMenu;