import MenuVertical from '~/components/icons/MenuVertical';

import { Menu } from '@headlessui/react';

import type { FC, MouseEventHandler } from 'react';
import { TextButton } from '~/components/buttons';

type Props = {
    onDelete: MouseEventHandler<HTMLButtonElement>
}

const NoteListMenu: FC<Props> = ({
    onDelete,
}) => {
    return (
        <Menu as='div'>
            <Menu.Button className='flex w-full items-center p-2 focus:bg-sidebar-focus focus:outline-none'>
                <MenuVertical className='h-5 w-5 fill-text-label' />
            </Menu.Button>
            <Menu.Items className="absolute z-10 mx-2 w-[128px] rounded border border-border-dark bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus">
                <Menu.Item>
                    {({ active }) => (
                        <TextButton className={`w-full ${active && ' bg-surface-hover'} flex items-center justify-start text-sm`} onClick={onDelete}>
                            <span>DELETE</span>
                        </TextButton>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default NoteListMenu;