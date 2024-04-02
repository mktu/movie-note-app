import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { ContainedButton } from "~/components/buttons"
import PenIcon from '~/components/icons/Pen'

type Props = {
    onNavigateNote: () => void,
    hasNote?: boolean
}

const Footer: FC<Props> = ({
    onNavigateNote,
    hasNote
}) => {
    const { t } = useTranslation('common')
    return (
        <>
            <div className='h-[72px]' />
            <div className='fixed bottom-0 left-0 flex w-full items-center justify-center border-t border-border-main bg-white/90 p-2 md:hidden'>
                {hasNote ? (
                    <ContainedButton className="flex w-full items-center justify-center gap-3" onClick={onNavigateNote}>
                        <PenIcon className='h-5 w-5 fill-onprimary-main' />
                        <span className='text-onprimary-main'>{t('edit-note')}</span>
                    </ContainedButton>
                ) : (
                    <ContainedButton className="flex w-full items-center justify-center gap-3" onClick={onNavigateNote}>
                        <PenIcon className='h-5 w-5 fill-onprimary-main' />
                        <span className='text-onprimary-main'>{t('edit-note')}</span>
                    </ContainedButton>
                )}

            </div>
        </>
    )
}

export default Footer