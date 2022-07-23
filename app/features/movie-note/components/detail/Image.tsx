import { forwardRef, useState } from 'react'
import ImgPlaceholder from '~/components/icons/ImgPlaceholder'

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
            <ImgPlaceholder className={className} width={width} height={height} />
        )
    }
    return (
        <img className={className} src={src} alt={alt} loading='lazy' onError={(e) => {
            setError(true)
            setLoading(false)
            onError && onError(e)
        }} style={{
            width, height,
            backgroundImage: loading ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPMkwQAAPsAiUBY9G8AAAAASUVORK5CYII=)' : 'none',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            ...style
        }} onLoad={() => {
            setLoading(false)
        }} {...props}
        />
    );
});

Image.displayName = 'image'

export default Image;