import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react'

type Props = {
    header: ReactNode,
    preview: ReactNode,
    publishSettings: ReactNode
    footer: ReactNode
}

const PreviewLayout: FC<Props> = ({
    header,
    preview,
    publishSettings,
    footer
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 md:py-5'>
            <div className='w-full'>{header}</div>
            <TabGroup>
                <TabList className='flex items-center gap-5 border-b border-border-main px-2 text-lg text-text-label'>
                    {['公開設定', 'プレビュー'].map(v => (
                        <Tab key={v} className={({ selected }) => clsx(
                            'rounded-t p-2 ring-offset-focus hover:bg-surface-hover hover:text-text-main focus:outline-none focus:ring',
                            selected && 'border-b-2 border-focus focus:border-none')}>{v}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel tabIndex={-1}>{publishSettings}</TabPanel>
                    <TabPanel tabIndex={-1}>{preview}</TabPanel>
                </TabPanels>
            </TabGroup>
            {footer}
        </div>
    );
};

export default PreviewLayout;