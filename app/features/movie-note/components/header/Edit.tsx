import { forwardRef } from 'react'
import { ContainedButton } from '~/components/buttons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Error from './Error'
import useFloatingHeader from './useFloatingHeader';

type Props = {
    onClickSave: () => void,
    title: string,
    className?: string,
    canSave?: boolean
    error?: string
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    onClickSave,
    className,
    canSave,
    title,
    error
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()
    return (
        <>
            <div ref={(elm) => {
                if (typeof ref === 'function') {
                    ref(elm)
                } else if (ref?.current) {
                    ref.current = elm;
                }
                setObserverElm(elm)
            }} className={clsx(className, 'flex w-full items-center gap-2 py-2',
                !inView && 'fixed top-0 right-0 z-20 bg-white/80 px-10 shadow')}>
                <div className='flex w-full flex-1 items-center text-lg font-semibold text-text-main'>
                    {title}
                </div>
                <div className='ml-auto flex items-center gap-2 font-semibold'>
                    <ContainedButton disabled={!canSave} onClick={onClickSave}>{t('update')}</ContainedButton>
                </div>
            </div>
            <div ref={inViewRef} />
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;