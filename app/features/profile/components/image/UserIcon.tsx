import clsx from 'clsx';
import type { FC } from 'react'
import { ImagePlaceholder } from '~/components/placeholders';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    alt: string,
    color?: 'default' | 'onprimary'
}

const Colors = {
    default: {
        border: 'border-border-main',
        text: 'text-text-label'
    },
    onprimary: {
        border: 'border-onprimary-main',
        text: 'text-onprimary-main'
    }
}

const UserIcon: FC<Props> = ({
    width,
    height,
    alt,
    style,
    src,
    color = 'default',
    ...props
}) => {
    return (
        <div className={clsx('flex justify-center overflow-hidden rounded-full border', Colors[color].border)} style={{
            width,
            height
        }}>
            {src ? (
                <img src={src} width={width} height={height} alt={alt} {...props} style={{ objectFit: 'cover', ...style }} />
            ) : (
                <ImagePlaceholder width={width} height={height} alt={alt} className={Colors[color].text} />
            )}

        </div>
    );
};

export default UserIcon;