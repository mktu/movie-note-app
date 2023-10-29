import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import { OutlinedButton } from '~/components/buttons';
import PenIcon from '~/components/icons/Pen';
import AddFill from '~/components/icons/AddFill';
import { TextInput } from '~/components/inputs';

type Props = {
    className?: string,
}

const New = forwardRef<HTMLDivElement, Props>(({
    className,
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()
    return (
        <>
            <div ref={inViewRef} />
            {!inView && (
                <div className='h-[64px]' /> // for layout sfift
            )}
            <div ref={(elm) => {
                if (typeof ref === 'function') {
                    ref(elm)
                } else if (ref?.current) {
                    ref.current = elm;
                }
                setObserverElm(elm)
            }} className={clsx(className, 'flex w-full items-center gap-2 py-4',
                !inView && 'fixed top-0 right-0 z-20 bg-white/80 px-10 shadow')}>
                <div className='flex w-full flex-1 items-center'>
                    <TextInput
                        addonLeft={
                            <PenIcon className='h-5 w-5 fill-text-label' />
                        }
                        placeholder='テンプレートのタイトルを入力'
                        className='group w-full'
                        borderClassName=''
                    />
                </div>
                <OutlinedButton border='border-2 border-text-main group-hover:border-text-main' className='group ml-auto flex items-center gap-1 bg-surface-main'
                    onClick={() => { }}>
                    <AddFill className='h-5 w-5 fill-text-main group-hover:fill-text-dark' />
                    <span className='text-text-main group-hover:text-text-dark'>{t('save')}</span>
                </OutlinedButton>
            </div>
        </>
    );
});

New['displayName'] = 'new-header'

export default New;