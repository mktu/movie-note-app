import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Sort from '~/components/icons/Sort';
import type { SortType } from '../../type-defs';

type Props = {
    onSort: (sortType: SortType) => void
}



const SortMenu: FC<Props> = ({ onSort }) => {
    const { t } = useTranslation('common')
    const targets: { [key: string]: string } = {
        'created-at-desc': t('created-at-desc'),
        'created-at-asc': t('created-at-asc'),
        'updated-at-desc': t('updated-at-desc'),
    }
    return (
        <Menu as='div'>
            <Menu.Button>
                <Sort className={clsx('h-5 w-5 fill-text-label hover:fill-text-main')} />
            </Menu.Button>
            <Menu.Items className={'absolute z-20 mt-2 w-[256px] rounded border border-border-dark bg-white py-2 text-sm'}>
                {Object.keys(targets).map(v => (
                    <Menu.Item key={v}>
                        <TextButton className={clsx('group flex w-full items-center gap-2 hover:bg-surface-hover')} onClick={async () => {
                            onSort(v as SortType)
                        }}>
                            {targets[v]}
                        </TextButton>
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default SortMenu;