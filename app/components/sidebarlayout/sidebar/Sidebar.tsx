import type { FC, ReactNode } from "react";
import StaticLinks from './StaticLinks'
import { IconButton } from "~/components/buttons";
import AnglesLeft from "~/components/icons/AnglesLeft";
import { useAppLayoutContext } from "~/providers/app-layout";

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
    const { setOpenMobileMenu } = useAppLayoutContext()
    return (
        <div className='relative flex w-full flex-col divide-y divide-border-main'>
            <IconButton name='close' className='absolute right-2 top-2 md:hidden' onClick={() => {
                setOpenMobileMenu(false)
            }}>
                <AnglesLeft className='h-6 w-6 fill-text-placeholder' />
            </IconButton>
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