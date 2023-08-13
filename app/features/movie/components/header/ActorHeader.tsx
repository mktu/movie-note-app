import clsx from 'clsx';
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next';
import Error from './Error';
import useFloatingHeader from '~/hooks/useFloatingHeader';

type Props = {
    className?: string,
    error?: string,
    actorName: string
}

const ActorHeader = forwardRef<HTMLDivElement, Props>(({
    className,
    error,
    actorName
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
                <div className='flex w-full flex-1 items-center text-lg font-semibold text-text-main'>
                    {actorName}
                </div>
            </div>

            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

ActorHeader['displayName'] = 'header'

export default ActorHeader;