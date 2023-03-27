import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { FC } from 'react'
import { TextButton } from '~/components/buttons';
import Check from '~/components/icons/Check';
import Sort from '~/components/icons/Sort';
import type { SortType } from '../../hooks/useMovieNoteList';

type Props = {
    sortType?: SortType,
    onSort: (sortType: SortType) => void
}



const SortMenu: FC<Props> = ({ onSort, sortType }) => {
    const targets: { [key: string]: string } = {
        'created-at-desc': '最近作成したノート',
        'updated-at-desc': '最近更新したノート',
        'created-at-asc': '最も古いノート'
    }
    return (
        <Menu as='div'>
            <Menu.Button>
                <Sort className='h-5 w-5 fill-text-label hover:fill-text-main' />
            </Menu.Button>
            <Menu.Items className={'absolute z-20 mt-2 w-[256px] rounded border border-border-dark bg-white py-2 text-sm'}>
                {Object.keys(targets).map(v => (
                    <Menu.Item key={v}>{({ active }) => (
                        <TextButton className={clsx('group flex w-full items-center gap-2 hover:bg-surface-hover',
                            sortType === v ? 'text-text-dark' : '')} onClick={async () => {
                                onSort(v as SortType)
                            }}>
                            <Check className={clsx('h-4 w-4 fill-text-label group-hover:opacity-100', sortType === v ? 'opacity-100' : 'opacity-10')} />
                            <span>{targets[v]}</span>
                        </TextButton>
                    )}</Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default SortMenu;