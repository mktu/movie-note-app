import type { FC } from 'react'
//import { usePreview } from '~/features/publish/hooks/useReviewContent';

type Props = {
    noteId?: string
}

const Prview: FC<Props> = ({ noteId }) => {
    //usePreview({ noteId })
    return (
        <div className=''>
        </div>
    );
};

export default Prview;