import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Check from '~/components/icons/Check';
import Filter from '~/components/icons/Filter';
import type { FilterType } from '../../type-defs';

type Props = {
    filterType?: FilterType,
    onFilter: (filterType: FilterType) => void
}

const FilterMenu: FC<Props> = ({ onFilter, filterType }) => {
    const { t } = useTranslation('common')
    const targets: { [key: string]: string } = {
        'watched': t('watched'),
        'lookforward': t('lookforward'),
        'all': t('all')
    }
    return (
        <Menu as='div'>
            <Menu.Button>
                <Filter className={clsx('h-5 w-5 hover:fill-text-main',
                    filterType && filterType !== 'all' ? 'fill-text-main' : 'fill-text-label')} />
            </Menu.Button>
            <Menu.Items className={'absolute z-20 mt-2 w-[128px] rounded border border-border-dark bg-white py-2 text-sm'}>
                {Object.keys(targets).map(v => (
                    <Menu.Item key={v}>{({ active }) => (
                        <TextButton className={clsx('group flex w-full items-center gap-2 hover:bg-surface-hover',
                            filterType === v ? 'text-text-dark' : '')} onClick={async () => {
                                onFilter(v as FilterType)
                            }}>
                            <Check className={clsx('h-4 w-4 fill-text-main group-hover:opacity-100', filterType === v ? 'opacity-100' : 'opacity-10')} />
                            <span>{targets[v]}</span>
                        </TextButton>
                    )}</Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default FilterMenu;