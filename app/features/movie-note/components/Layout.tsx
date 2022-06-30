import type { FC, ReactNode } from "react";
import Split from 'react-split'
import Sidebar from "./Sidebar";

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <Split className='flex flex-row w-screen h-screen ' gutterAlign="center" sizes={[20, 80]} minSize={[256, 512]}
            gutter={(_, direction) => {
                const gutterElement = document.createElement('div')
                gutterElement.className = `gutter gutter-${direction} w-[1px] bg-border-dark hover:cursor-col-resize hover:w-4 hover:border-x hover:border-secondary-main transition-all delay-300 duration-300 ease-in-out`
                return gutterElement
            }}
            gutterStyle={() => ({})}
        >
            <div className={`h-full w-full bg-sidebar-main`}>
                <Sidebar />
            </div>
            <div className={`h-full w-full border-border-dark`}>{children}</div>
        </Split>
    )
}

export default Layout