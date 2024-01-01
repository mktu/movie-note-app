import { useCallback, useContext } from "react";
import type { FC, ReactNode } from "react";
import { IconButton } from "~/components/buttons";
import AnglesRight from "~/components/icons/AnglesRight";
import AnglesLeft from "~/components/icons/AnglesLeft";
import useSplit from './useSplit'
import LocalStorageContext from '~/providers/localstorage/Context';

type Props = {
    sidebar: ReactNode,
    children: ReactNode,
    initialSidebarWidth: number,
}

const MinWidth = 200
const WidthClosed = 50


const Layout: FC<Props> = ({ sidebar, children, initialSidebarWidth }) => {
    const { getSidebarWidth, getLastSidebarWidth: getVisibleSidebarWidth, saveSidebarWidth, saveLastSidebarWidth: saveVisibleSidebarWidth, localstorageLoaded } = useContext(LocalStorageContext)
    const savedWidth = localstorageLoaded ? getSidebarWidth() : initialSidebarWidth
    const hideSidebar = savedWidth === WidthClosed
    const updateWidth = useCallback((width: number, visibleWidth?: number) => {
        if (hideSidebar && MinWidth >= width) {
            return // remain hidden
        }
        visibleWidth && saveVisibleSidebarWidth(visibleWidth)
        saveSidebarWidth(width)
    }, [hideSidebar, saveSidebarWidth, saveVisibleSidebarWidth])
    const onDragEnd = useCallback((lastWidth: number) => {
        const hide = lastWidth <= MinWidth
        if (hide) {
            updateWidth(WidthClosed);
        } else {
            updateWidth(lastWidth, lastWidth);
        }
    }, [updateWidth])

    const { setGutter, setRoot, moving } = useSplit({ onDragEnd, minWidth: MinWidth, widthClosed: WidthClosed })

    return (
        <div ref={setRoot} className='flex h-full w-screen overflow-x-hidden'>
            <div className={`min-h-screen bg-sidebar-main ${(!moving) && 'transition-all ease-in-out'} overflow-x-hidden`} style={{ width: savedWidth }}>
                {!hideSidebar && sidebar}
            </div>
            <div className={`relative min-h-screen w-1 cursor-move bg-sidebar-main transition-all ease-in-out hover:bg-border-main`}
                ref={setGutter} >
                <IconButton name='toggle-sidebar'
                    onClick={(e) => {
                        e.stopPropagation()
                        if (hideSidebar) {
                            const w = getVisibleSidebarWidth()
                            updateWidth(w, w)
                        } else {
                            updateWidth(WidthClosed)
                        }
                    }}
                    className='absolute right-1/2 top-2 z-10 translate-x-1/2 rounded-full border border-border-dark bg-surface-main p-1' >
                    {hideSidebar ? <AnglesRight name="open-sidebar" className='h-5 w-5 fill-border-dark' /> :
                        <AnglesLeft name="close-sidebar" className='h-5 w-5 fill-border-dark' />
                    }
                </IconButton>
            </div>
            <div className={`h-full min-h-screen w-full flex-1 overflow-x-hidden border-border-main`}>{children}</div>
        </div>
    )
}

export default Layout