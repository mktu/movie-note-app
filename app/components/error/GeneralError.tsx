import type { FC } from 'react'
import { useTranslation } from 'react-i18next';

import type { ErrorKey } from '~/features/movie-note/utils/error';

type Props = {
    key: ErrorKey
}

const GeneralError: FC<Props> = ({ key }) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full items-center justify-center p-6'>
            <h2 className='text-text-label'>{t(key)}</h2>
        </div>
    )
};

export default GeneralError;