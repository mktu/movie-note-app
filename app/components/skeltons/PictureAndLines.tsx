import type { ComponentProps, FC } from "react"
import ContentLoader from "react-content-loader"

type Props = ComponentProps<typeof ContentLoader> & {
    lineCount?: number,
    picW?: number,
    picH?: number,
}

const PictureAndLines: FC<Props> = ({ width = 300, height = 100, lineCount = 10, picW, picH, ...props }) => {
    const picWidth = picW || Math.round(Number(width) / 10.0 * 4.0)
    const picHeight = picH || picWidth
    const lineOffset = picWidth + Math.round(Number(width) / 10.0 * 0.2)
    const lineWidth = Math.round(Number(width) - lineOffset)
    const lineHeight = Math.round(Number(height) / lineCount)
    const boxHeight = Math.round(Number(height) * 0.8 / lineCount)
    return (
        <ContentLoader
            speed={2}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x={0} y={0} rx="3" ry="3" width={picWidth} height={picHeight} />
            {[...Array(lineCount)].map((_, i) => (
                <rect key={i} x={lineOffset} y={lineHeight * i} rx="3" ry="3" width={lineWidth} height={boxHeight} />
            ))}
        </ContentLoader>
    )
}

export default PictureAndLines