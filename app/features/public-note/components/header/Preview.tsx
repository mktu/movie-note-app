import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ButtonBase, IconButton } from '~/components/buttons';
import { useNotePreviewContext } from '../../context/public-note/Context';
import { Error } from '~/components/header'
import LoadingIcon from '~/components/icons/Loading'
import PenIcon from '~/components/icons/Pen'
import type { useFetcher } from '@remix-run/react';


type Props = {
    title: string,
    error?: string,
    onClickBack: () => void,
    state: ReturnType<typeof useFetcher>['state']
}

const Preview: FC<Props> = ({
    title,
    error,
    onClickBack,
    state
}) => {
    const { onSubmit, isEditing } = useNotePreviewContext()
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex w-full items-center px-10'>
                <div className='flex flex-1 items-center gap-2'>
                    <h3>
                        {title}
                    </h3>
                    <IconButton onClick={onClickBack} className='fill-text-main md:hidden' name='back-to-edit'><PenIcon /></IconButton>
                </div>
                <div className='ml-auto hidden items-center whitespace-nowrap md:flex'>
                    <ButtonBase onClick={onClickBack} className='whitespace-nowrap rounded-l-lg border border-border-main bg-surface-main px-4 py-2 font-medium text-text-main hover:bg-surface-hover hover:text-text-dark'>{t('back-to-note')}</ButtonBase>
                    <ButtonBase disabled={!isEditing} className='flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-r-lg border border-primary-main bg-primary-main px-4 py-2 font-medium text-onprimary-main'
                        onClick={onSubmit}
                    >{
                            state !== 'idle' ? <LoadingIcon className='mr-2 size-5 stroke-slate-500' strokeWidth={6} /> :
                                isEditing ? t('save') : t('saved')
                        }</ButtonBase>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default Preview;