import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton, TextButton } from '~/components/buttons';

type Props = {
    onPublish: () => void,
    onBack: () => void,
    title: string
}

const Preview: FC<Props> = ({
    onBack,
    onPublish,
    title
}) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full items-center'>
            <div>{t('comfirm-publish', { title })}</div>
            <div className='ml-auto flex items-center gap-2'>
                <ContainedButton onClick={onPublish}>{t('publish')}</ContainedButton>
                <TextButton onClick={onBack}>{t('back')}</TextButton>
            </div>
        </div>
    );
};

export default Preview;