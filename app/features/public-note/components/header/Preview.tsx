import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton, TextButton } from '~/components/buttons';
import { TextArea } from '~/components/inputs';
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
    const { html, onSubmit, setSummary, summary } = useNotePreviewContext()
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full items-end'>
            <div className='flex w-full flex-col gap-2'>
                <div>
                    {isUpdate ? t('confirm-update-published', { title }) : t('comfirm-publish', { title })}
                </div>
                <div>
                    <TextArea
                        value={summary}
                        onChange={(e) => {
                            setSummary(e.target.value)
                        }}
                        className='max-w-[540px]'
                        placeholder={t('add-note-summary')}
                        minRows={2}
                        maxRows={3}
                    />
                </div>
            </div>
            <div className='ml-auto flex items-center gap-2 whitespace-nowrap'>
                <ContainedButton disabled={!html} onClick={onSubmit}>{isUpdate ? t('update') : t('publish')}</ContainedButton>
                <TextButton onClick={onBack}>{t('back')}</TextButton>
            </div>
        </div>
    );
};

export default Preview;