import type { FC, ReactNode } from "react"
import WebLayout from "./WebLayout"
import MobileLayout from "./MobileLayout"

type Props = {
    children: ReactNode,
    titleMessage?: string
}

const LayoutRoot: FC<Props> = (props) => (
    <>
        <WebLayout {...props} />
        <MobileLayout {...props} />
    </>
)

export default LayoutRoot