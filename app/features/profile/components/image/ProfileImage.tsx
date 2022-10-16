import type { FC } from 'react'
import { ImagePlaceholder } from '~/components/placeholders';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    alt: string
}

const ProfileImage: FC<Props> = ({
    width,
    height,
    alt,
    style,
    src,
    ...props
}) => {
    return (
        <div className='flex justify-center overflow-hidden rounded' style={{
            width,
            height
        }}>
            {src ? (
                <img src={src} width={width} height={height} alt={alt} {...props} style={{ objectFit: 'cover', ...style }} />
            ) : (
                <ImagePlaceholder width={width} height={height} alt={alt} className='text-text-label' />
            )}

        </div>
    );
};

export default ProfileImage;