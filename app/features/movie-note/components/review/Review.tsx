import type { FC } from 'react'
import { TextInput } from '~/components/inputs';
import Stars from './Stars';

type Props = {
    admirationDate?: string,
    setAdmirationDate: (date: string) => void,
    stars?: number,
    setStars: (stars: number) => void
}

const Review: FC<Props> = ({
    admirationDate,
    stars,
    setStars,
    setAdmirationDate
}) => {
    return (
        <div className='flex items-center gap-2'>
            <div>
                <label htmlFor='admiration-date' className='text-sm'>観賞日</label>
                <TextInput value={admirationDate} onChange={(e) => {
                    setAdmirationDate(e.target.value)
                }} id='admiration-date' type={'date'} className='w-[256px] text-text-label' />
            </div>
            <div className='ml-auto'>
                <Stars stars={stars || -1} onSetStar={setStars} />
            </div>
        </div>
    );
};

export default Review;