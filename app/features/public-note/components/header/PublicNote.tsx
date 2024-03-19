import type { FC } from 'react'
import Image from '~/components/Image';
import { useTranslation } from 'react-i18next';
import UserPlaceholder from '~/components/icons/User';
import { Error } from '~/components/header'
import { UserIcon } from '~/features/profile/components/image';
import type { User } from '@type-defs/frontend';
import { formatDate } from '@utils/time';
import { TmdbmageBasePath } from '@utils/constants';

const imageBasePath = `${TmdbmageBasePath}/w440_and_h660_face`

type Props = {
    title: string,
    error?: string,
    creator: User,
    lastUpdated?: string,
    posterImage?: string,
    coverImage: string | null,
    summary?: string
}

const PublicNote: FC<Props> = ({
    title,
    error,
    creator,
    lastUpdated,
    posterImage,
    coverImage,
    summary
}) => {
    const { t } = useTranslation('common')
    const { image, name } = creator || {}
    const imagePath = posterImage ? `${imageBasePath}${posterImage}` : undefined
    return (
        <>
            <div className='flex w-full justify-center'>
                <div className='flex items-center gap-10'>
                    <Image className='overflow-hidden rounded' width={150} height={225}
                        src={coverImage || imagePath} alt={title || ''} />
                    <div>
                        <h3>{title}</h3>
                        <div className='mt-5 flex items-center gap-4'>
                            {image ? (
                                <UserIcon width={48} height={48} src={image} alt={'user'} />
                            ) : <UserPlaceholder className='h-5 w-5 fill-text-main' />}
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold text-text-main'>{name}</span>
                                <span className='text-sm text-text-label'>{lastUpdated && t('update-date', {
                                    date: formatDate(lastUpdated), interpolation: {
                                        escapeValue: false
                                    }
                                })}</span>
                            </div>
                        </div>
                        <div className='mt-2'>{summary}</div>
                    </div>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default PublicNote;