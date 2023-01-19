import type { FC } from 'react'
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';
import { PictureAndLines } from '~/components/skeltons';

import type useOgp from '../../../../hooks/useOgp';
import PreviewCard from './PreviewCard';
import Error from './Error'

type Props = ReturnType<typeof useOgp> & {
    onClickRemove: () => void,
    url: string
}

const LinkPreview: FC<Props> = ({
    onClickRemove,
    ogp,
    loading,
    error,
    url
}) => {
    return (
        <div >
            <IconButton name='remove' className='absolute right-2 top-1' onClick={onClickRemove}>
                <X className='h-5 w-5 fill-text-label' />
            </IconButton>
            {loading ? (
                <PictureAndLines width={500} height={50} picW={100} picH={50} lineCount={4} />
            ) : error ? (
                <Error url={url} />
            ) : (
                <PreviewCard ogp={ogp} />
            )
            }
        </div>
    );
};

export default LinkPreview;