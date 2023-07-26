import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';

import { Dialog } from '@headlessui/react';

import type { FC } from 'react'
import type { Credits as CreditsType } from '~/features/tmdb';
import Credits from './Credits'
import type { TmdbDetail } from '~/features/tmdb';
import Image from '~/components/Image'
import { TmdbmageBasePath } from '@utils/constants';

type Props = {
    detail: TmdbDetail | null,
    credits: CreditsType | null,
    open: boolean,
    onClose: () => void,
}

const imageBasePath = `${TmdbmageBasePath}/w300_and_h450_bestv2`
const imageBasePaths = [
    `${TmdbmageBasePath}/w300_and_h450_bestv2`,
    imageBasePath,
]

const DetailDialog: FC<Props> = ({
    detail,
    credits,
    open,
    onClose
}) => {
    const { t } = useTranslation('common')
    const {
        poster_path,
        backdrop_path,
        release_date,
        title
    } = detail || {}
    const src = poster_path || backdrop_path || ''
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-4xl rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title className='' as='h4'>{t('movie-detail', { movie: title })}</Dialog.Title>
                    <Dialog.Description as='div' className='my-2'>
                        <div className='flex w-full'>
                            <div>
                                <Image
                                    alt={detail?.title || 'Error'}
                                    className='overflow-hidden rounded-xl'
                                    key={src}
                                    src={src && `${imageBasePath}/${src}`}
                                    srcSet={imageBasePaths.map((path, idx) => `${path}/${src} ${idx + 1}x`).join(',')}
                                    width={160}
                                    height={250} />
                            </div>
                            <div className='ml-4 flex w-full flex-1 flex-col gap-4 overflow-hidden text-text-label'>
                                <div>
                                    <h3 className='mb-2 text-lg'>{t('over-view')}</h3>
                                    <div id='detail' className='overflow-y-auto'>
                                        {detail?.overview}
                                        <span id='release-date'>({release_date} {t('release')})</span>
                                    </div>
                                </div>
                                <Credits credits={credits} />
                            </div>
                        </div>
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>{t('close')}</TextButton>
                    </div>
                </Dialog.Panel>
            </div>

        </Dialog>
    );
};

export default DetailDialog;