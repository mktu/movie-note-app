import clsx from 'clsx';
import { forwardRef, useState } from 'react'
import Img from 'public/ImgPlaceholder.svg'

type Props = React.ImgHTMLAttributes<HTMLImageElement>

const Image = forwardRef<HTMLButtonElement, Props>(({
    className,
    width,
    height,
    alt,
    src,
    onError,
    style,
    ...props
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    if (error || !src) {
        return (
            <div className={clsx('bg-red-200', className)} style={{
                width, height,
                backgroundImage: `url(${Img})`,
            }} />
        )
    }
    return (
        <img className={className} src={src} alt={alt} width={width} height={height} loading='lazy' onError={(e) => {
            setError(true)
            setLoading(false)
            onError && onError(e)
        }} style={{
            backgroundImage: loading ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPMkwQAAPsAiUBY9G8AAAAASUVORK5CYII=)' : 'none',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            width, height,
            maxWidth: 'none',
            ...style
        }} onLoad={() => {
            setLoading(false)
        }} {...props}
        />
    );
});

Image.displayName = 'image'

export default Image;