import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
import { Error } from '~/components/header';
import AddFill from '~/components/icons/AddFill';
import PenIcon from '~/components/icons/Pen';
import { TextInput } from '~/components/inputs';
import useFloatingHeader from '~/hooks/useFloatingHeader';

type Props = {
    className?: string,
    title: string,
    onSave: (title: string) => void,
    error?: string
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    className,
    title: initTitle,
    onSave,
    error
}, ref) => {
    const { t } = useTranslation('common')
    const [title, setTitle] = useState(initTitle)
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
                !inView && 'fixed right-0 top-0 z-20 bg-white/80 px-10 shadow')}>
                <div className='flex w-full flex-1 items-center'>
                    <TextInput
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        addonLeft={
                            <PenIcon className='size-5 fill-text-label' />
                        }
                        placeholder='テンプレートのタイトルを入力'
                        className='group w-full'
                        borderClassName=''
                    />
                </div>
                <OutlinedButton border='border-2 border-text-main group-hover:border-text-main' className='group ml-auto flex items-center gap-1 bg-surface-main'
                    onClick={() => { onSave(title) }}>
                    <AddFill className='size-5 fill-text-main group-hover:fill-text-dark' />
                    <span className='text-text-main group-hover:text-text-dark'>{t('save')}</span>
                </OutlinedButton>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;