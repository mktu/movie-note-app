import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { ContainedButton } from "~/components/buttons"
import { useMovieNoteContext } from "../../context/movie-note/Context"
import LoadingIcon from '~/components/icons/Loading'

const Footer: FC = () => {
    const { t } = useTranslation('common')
    const {
        submitNote,
        editing,
        submitState,
        hasSavedNote
    } = useMovieNoteContext()

    return (
        <>
            <div className='h-[72px]' />
            <div className='fixed bottom-0 left-0 flex w-full items-center justify-center border-t border-border-main bg-white/90 p-2 md:hidden'>
                <ContainedButton disabled={!editing} className="flex w-full items-center justify-center gap-3" onClick={() => {
                    submitNote({ updatePublicNote: true })
                }}>
                    {submitState !== 'idle' && <LoadingIcon className='mr-2 size-5 stroke-slate-500' strokeWidth={6} />}
                    {submitState !== 'idle' ?
                        t('loading')
                        : editing ? t('save') : !hasSavedNote ? t('unsaved') : t('saved')}
                </ContainedButton>
            </div >
        </>
    )
}

export default Footer