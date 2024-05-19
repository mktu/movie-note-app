import { useCallback, useContext } from "react";
import type { FC, ReactNode } from "react";
import { IconButton } from "~/components/buttons";
import AnglesRight from "~/components/icons/AnglesRight";
import AnglesLeft from "~/components/icons/AnglesLeft";
import useSplit from './useSplit'
import LocalStorageContext from '~/providers/localstorage/Context';
import Bars from "../icons/Bars";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import { useAppLayoutContext } from "~/providers/app-layout";
import { Transition } from "@headlessui/react";

type Props = {
    sidebar: ReactNode,
    children: ReactNode,
    initialSidebarWidth: number,
}

const MinWidth = 200
const WidthClosed = 50


const Layout: FC<Props> = ({ sidebar, children, initialSidebarWidth }) => {
    const { ref: headerRef, inView } = useInView({ initialInView: true })
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
    const { openMobileMenu, setOpenMobileMenu } = useAppLayoutContext()
    return (
        <div ref={setRoot} className='flex h-full w-screen overflow-x-hidden'>

            <div className={`bg-sidebar-main min-h-screen ${(!moving) && 'transition-all ease-in-out'} hidden md:block`} style={{ width: savedWidth }}>
                {!hideSidebar && sidebar}
            </div>
            <div className={`bg-sidebar-main hover:bg-border-main relative hidden min-h-screen w-1 cursor-move transition-all ease-in-out md:block`}
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
                    className='border-border-dark bg-surface-main absolute right-1/2 top-2 z-10 translate-x-1/2 rounded-full border p-1' >
                    {hideSidebar ? <AnglesRight name="open-sidebar" className='fill-border-dark h-5 w-5' /> :
                        <AnglesLeft name="close-sidebar" className='fill-border-dark h-5 w-5' />
                    }
                </IconButton>
            </div>
            <div className={clsx('fixed left-0 top-0 z-50 w-full p-2 md:hidden',
                !inView && 'bg-white/80 shadow',
                openMobileMenu && 'hidden'
            )}>
                <IconButton name='menu' className='opacity-100' onClick={() => {
                    setOpenMobileMenu(true)
                }}>
                    <Bars className='fill-text-label h-8 w-8' />
                </IconButton>
            </div>
            <Transition
                as={'div'}
                className={'fixed left-0 top-0 z-50 min-h-full w-[90%] bg-white shadow md:hidden'}
                show={openMobileMenu}
                enter="transition ease-out duration-300 transform"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in duration-300 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
            >
                {sidebar}
            </Transition>
            <div className="absolute left-0 top-[32px]" ref={headerRef} />
            <div className={`border-border-main mt-[64px] h-full min-h-screen w-full flex-1 overflow-x-hidden md:mt-0`}>
                {children}
            </div>
        </div>
    )
}

export default Layout