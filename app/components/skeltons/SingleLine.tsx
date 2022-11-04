import type { ComponentProps, FC } from "react"
import ContentLoader from "react-content-loader"

type Props = ComponentProps<typeof ContentLoader>

const SingleLine: FC<Props> = ({ width = 400, height = 160, ...props }) => (
    <ContentLoader
        speed={2}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="3" ry="3" width={`${width}`} height={height} />
    </ContentLoader>
)

export default SingleLine