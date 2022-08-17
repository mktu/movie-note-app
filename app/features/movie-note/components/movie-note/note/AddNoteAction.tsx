import clsx from 'clsx';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
import AddFill from '~/components/icons/AddFill';

type Props = {
    className?: string,
    onClick: () => void
}

const AddNoteAction: FC<Props> = ({
    className,
    onClick
}) => {
    const { t } = useTranslation('common')
    return (
        <OutlinedButton rounded='rounded-full' className={clsx('inline-flex items-center text-text-main', className)}>
            <AddFill className='mr-2 h-5 w-5' />
            <span>{t('add-note')}</span>
        </OutlinedButton>
    );
};

export default AddNoteAction;