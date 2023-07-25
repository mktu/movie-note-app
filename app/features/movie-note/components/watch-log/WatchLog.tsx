import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextInput } from '~/components/inputs';
import Stars from './Stars';

export type WatchLogs = {
    stars: number,
    admirationDate: string
}

type Props = {
    admirationDate?: string,
    setAdmirationDate: (date: string) => void,
    stars?: number,
    setStars: (stars: number) => void
}

const WatchLog: FC<Props> = ({
    admirationDate,
    stars,
    setStars,
    setAdmirationDate
}) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex flex-col items-start justify-start gap-2'>
            <div>
                <label htmlFor='admiration-date' className='text-sm'>{t('watched-date')}</label>
                <TextInput value={admirationDate} onChange={(e) => {
                    setAdmirationDate(e.target.value)
                }} id='admiration-date' type={'date'} className='w-[256px] text-text-label' />
            </div>
            <div>
                <span className='mb-2 text-sm text-text-label'>{t('stars')}</span>
                <Stars stars={stars || 0} onSetStar={setStars} />
            </div>
        </div>
    );
};

export default WatchLog;