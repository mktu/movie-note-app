import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';

import { Dialog } from '@headlessui/react';

import Credits from './Credits';

import type { FC } from 'react'
import type { Credits as CreditsType, TmdbDetail } from '~/features/tmdb';
import type { Video } from '~/features/tmdb/utils';
import YoutubeContainer from './Youtube';

type Props = {
    detail: TmdbDetail | null,
    credits: CreditsType | null,
    open: boolean,
    onClose: () => void,
    trailers: Video[]
}

const DetailDialog: FC<Props> = ({
    detail,
    credits,
    open,
    onClose,
    trailers
}) => {
    const { t } = useTranslation('common')
    const {
        release_date,
        title
    } = detail || {}
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-4xl rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title className='' as='h4'>{t('movie-detail', { movie: title })}</Dialog.Title>
                    <Dialog.Description as='div' className='my-2 max-h-[650px] overflow-y-auto overflow-x-hidden'>
                        <div className='flex w-full flex-col gap-2'>
                            <div>
                                {trailers.length > 0 && (
                                    <YoutubeContainer trailers={trailers} />
                                )}
                            </div>
                            <div className='ml-4 flex w-full flex-1 flex-col gap-4 overflow-hidden text-text-label'>
                                <div>
                                    <h3 className='mb-2 text-lg'>{t('over-view')}</h3>
                                    <div id='detail' className='overflow-y-auto px-1'>
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