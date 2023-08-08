import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import Image from '~/components/Image'

///t/p/w300_and_h450_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 1x, /t/p/w600_and_h900_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 2x

const imageBasePath = `${TmdbmageBasePath}/w300_and_h450_bestv2`
const imageBasePaths = [
    `${TmdbmageBasePath}/w600_and_h900_bestv2`,
    imageBasePath,
]

type Props = {
    title?: string,
    src?: string
}

const MiniImage: FC<Props> = ({
    title,
    src
}) => {
    return (
        <Image
            alt={title || 'Error'}
            className='overflow-hidden rounded'
            key={src}
            src={src && `${imageBasePath}/${src}`}
            srcSet={imageBasePaths.map((path, idx) => `${path}/${src} ${idx + 1}x`).join(',')}
            width={32}
            height={48} />
    );
};

export default MiniImage;