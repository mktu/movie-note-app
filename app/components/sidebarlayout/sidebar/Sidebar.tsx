import type { FC, ReactNode } from "react";

type Props = {
    noteList: ReactNode,
    staticLinks: ReactNode,
    userMenu: ReactNode
}

const Sidebar: FC<Props> = ({
    noteList,
    staticLinks,
    userMenu
}) => {
    return (
        <div className='flex w-full flex-col divide-y divide-border-main'>
            <div>
                {userMenu}
            </div>
            <div>
                {staticLinks}
            </div>
            <div>
                {noteList}
            </div>
        </div>
    )
}

export default Sidebar