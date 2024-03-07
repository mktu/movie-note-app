import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react'

type Props = {
    header: ReactNode,
    preview: ReactNode,
    publishSettings: ReactNode
}

const PreviewLayout: FC<Props> = ({
    header,
    preview,
    publishSettings
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 py-5'>
            <div className='w-full px-10'>{header}</div>
            <Tab.Group>
                <Tab.List className='flex items-center gap-5 border-b border-border-main px-2 text-lg text-text-label'>
                    {['公開設定', 'プレビュー'].map(v => (
                        <Tab key={v} className={({ selected }) => clsx(
                            'rounded-t p-2 ring-offset-focus hover:bg-surface-hover hover:text-text-main focus:outline-none focus:ring',
                            selected && 'border-b-2 border-focus focus:border-none')}>{v}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel tabIndex={-1}>{publishSettings}</Tab.Panel>
                    <Tab.Panel tabIndex={-1}>{preview}</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default PreviewLayout;