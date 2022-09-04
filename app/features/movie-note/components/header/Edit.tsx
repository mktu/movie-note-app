import { forwardRef } from 'react'
import { ContainedButton } from '~/components/buttons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Error from './Error'

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
    return (
        <>
            <div ref={ref} className={clsx(className, 'flex items-center gap-2 ')}>
                <div className='flex w-full flex-1 items-center text-lg font-semibold text-text-main'>
                    {title}
                </div>
                <div className='ml-auto flex items-center gap-2 font-semibold'>
                    <ContainedButton disabled={!canSave} onClick={onClickSave}>{t('update')}</ContainedButton>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;