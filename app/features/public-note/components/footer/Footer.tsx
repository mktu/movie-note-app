import type { useFetcher } from "@remix-run/react"
import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { ContainedButton } from "~/components/buttons"
import LoadingIcon from '~/components/icons/Loading'
import { useNotePreviewContext } from "../../context/public-note/Context"

type Props = {
    state: ReturnType<typeof useFetcher>['state']
}

const Footer: FC<Props> = ({ state }) => {
    const { t } = useTranslation('common')
    const { onSubmit, isEditing } = useNotePreviewContext()

    return (
        <>
            <div className='h-[72px] md:hidden' />
            <div className='fixed bottom-0 left-0 flex w-full items-center justify-center border-t border-border-main bg-white/90 p-2 md:hidden'>
                <ContainedButton disabled={!isEditing} className="flex w-full items-center justify-center gap-3" onClick={() => {
                    onSubmit()
                }}>
                    {state !== 'idle' && <LoadingIcon className='mr-2 size-5 stroke-slate-500' strokeWidth={6} />}
                    {state !== 'idle' ?
                        t('loading')
                        : isEditing ? t('save') : t('saved')}
                </ContainedButton>
            </div >
        </>
    )
}

export default Footer