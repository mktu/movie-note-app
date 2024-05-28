import clsx from 'clsx';
import Img from '/ImgPlaceholder.svg?url';

import type { FC } from 'react'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { alt: string }

const Image: FC<Props> = ({
    className,
    width,
    height,
    alt
}) => {
    return (
        <div className={clsx('flex items-center justify-center', className)} style={{
            width, height,
            backgroundImage: `url(${Img})`,
        }} >{alt}</div>
    );
};

export default Image;