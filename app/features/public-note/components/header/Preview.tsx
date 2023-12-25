import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import { useNotePreviewContext } from '../../context/public-note/Context';

type Props = {
    onBack: () => void,
    isUpdate: boolean,
    title: string,
}

const Preview: FC<Props> = ({
    onBack,
    isUpdate,
    title,
}) => {
    const { html, onSubmit } = useNotePreviewContext()
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full items-end'>
            <h3 className='flex-1'>
                {title}
            </h3>
            <div className='ml-auto flex items-center gap-2 whitespace-nowrap'>
                <ContainedButton disabled={!html} onClick={onSubmit}>{isUpdate ? t('update') : t('publish')}</ContainedButton>
            </div>
        </div>
    );
};

export default Preview;