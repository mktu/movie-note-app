import type { FC, ReactNode } from "react";
import StaticLinks from './StaticLinks'

type Props = {
    noteList: ReactNode,
    userMenu: ReactNode
}

const Sidebar: FC<Props> = ({
    noteList,
    userMenu
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
                {noteList}
            </div>
        </div>
    )
}

export default Sidebar