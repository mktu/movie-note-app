import { forwardRef, useState } from 'react'
import { ImagePlaceholder } from '~/components/placeholders';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { alt: string }

const Image = forwardRef<HTMLImageElement, Props>(({
    className,
    width,
    height,
    alt,
    src,
    onError,
    style,
    ...props
}, ref) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    if (error || !src) {
        return (
            <ImagePlaceholder className={className} width={width} height={height} alt={alt} />
        )
    }
    return (
        <img ref={ref} className={className} src={src} alt={alt} width={width} height={height} loading='lazy' onError={(e) => {
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