import type { ComponentProps, FC } from "react"
import ContentLoader from "react-content-loader"

type Props = ComponentProps<typeof ContentLoader> & {
    lineCount?: number
}

const PictureAndLines: FC<Props> = ({ width = 300, height = 100, lineCount = 10, ...props }) => {
    const picWidth = Math.round(Number(width) / 10.0 * 4.0)
    const lineWidth = Math.round(Number(width) / 10.0 * 5.8)
    const lineOffset = Math.round(Number(width) / 10.0 * 4.2)
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
            <rect x={0} y={0} rx="3" ry="3" width={picWidth} height={picWidth} />
            {[...Array(lineCount)].map((_, i) => (
                <rect key={i} x={lineOffset} y={lineHeight * i} rx="3" ry="3" width={lineWidth} height={boxHeight} />
            ))}
        </ContentLoader>
    )
}

export default PictureAndLines