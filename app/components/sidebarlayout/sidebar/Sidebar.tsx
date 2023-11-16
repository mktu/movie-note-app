import type { FC, ReactNode } from "react";
import StaticLinks from './StaticLinks'

type Props = {
    noteList: ReactNode,
    userMenu: ReactNode
    searchMenu: ReactNode,
    templateList: ReactNode
}

const Sidebar: FC<Props> = ({
    noteList,
    userMenu,
    searchMenu,
    templateList
}) => {
    return (
        <div className='flex w-full flex-col divide-y divide-border-main'>
            <div>
                {userMenu}
            </div>
            <div>
                <StaticLinks />
            </div>
            <div>
                {searchMenu}
            </div>
            <div>
                {noteList}
            </div>
            <div>
                {templateList}
            </div>
        </div>
    )
}

export default Sidebar