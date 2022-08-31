import { useState, useEffect, useCallback } from "react";
import type { FC, ReactNode } from "react";
import { IconButton } from "~/components/buttons";
import AnglesRight from "~/components/icons/AnglesRight";
import AnglesLeft from "~/components/icons/AnglesLeft";
import { getSidebarWidth, getVisibleSidebarWidth, saveSidebarWidth, saveVisibleSidebarWidth } from "@utils/localstorage";


type Props = {
    sidebar: ReactNode,
    children: ReactNode
}

const useSplit = ({
    onDragEnd,
    onDragStart,
    minWidth,
    widthClosed
}: {
    onDragEnd?: (lastWidth: number) => void,
    onDragStart?: (startWidth: number) => void,
    minWidth?: number,
    widthClosed?: number
}) => {
    const [root, setRoot] = useState<HTMLElement | null>(null)
    const [gutter, setGutter] = useState<HTMLElement | null>(null)
    const [moving, setMoving] = useState(false)

    useEffect(() => {
        if (!gutter || !root) {
            return
        }
        if (root.childNodes.length < 3) {
            console.error('child nodes must be 3 or more')
            return
        }
        let unregisters: VoidFunction[] = []
        const clear = () => {
            unregisters.forEach(f => f())
            unregisters = []
        }
        const stop = (e: MouseEvent) => {
            setMoving(false)
            const w = (minWidth && minWidth >= e.clientX) ? widthClosed || minWidth : e.clientX
            root.children[0].setAttribute('style', `width:${w}px`)
            onDragEnd && onDragEnd(w)
            clear()
        }
        const move = (e: MouseEvent) => {
            if (unregisters.length === 0) {
                return
            }
            root.children[0].setAttribute('style', `width:${e.clientX}px`);
        }
        const dragstart = (e: MouseEvent) => {
            e.preventDefault()
            setMoving(true)
            onDragStart && onDragStart(e.clientX)
            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', stop)
            unregisters.push(
                () => { window.removeEventListener('mousemove', move) },
                () => { window.removeEventListener('mouseup', stop) }
            )
        }

        gutter.addEventListener('mousedown', dragstart)

        return () => {
            gutter.removeEventListener('mousedown', dragstart)
            clear()
        }
    }, [root, gutter, onDragEnd, onDragStart, widthClosed, minWidth])
    return {
        setRoot,
        setGutter,
        moving
    }
}

const MinWidth = 200
const WidthClosed = 50
const InitialSidebarWidth = 250

const Layout: FC<Props> = ({ sidebar, children }) => {
    const [savedWidth, setSavedWidth] = useState(0)
    const hideSidebar = savedWidth === WidthClosed
    const updateWidth = useCallback((width: number, visibleWidth?: number) => {
        if (hideSidebar && MinWidth >= width) {
            return // remain hidden
        }
        setSavedWidth(width)
        visibleWidth && saveVisibleSidebarWidth(visibleWidth)
        saveSidebarWidth(width)
    }, [hideSidebar])
    const onDragEnd = useCallback((lastWidth: number) => {
        const hide = lastWidth <= MinWidth
        if (hide) {
            updateWidth(WidthClosed);
        } else {
            updateWidth(lastWidth, lastWidth);
        }
    }, [updateWidth])
    useEffect(() => {
        setSavedWidth(getSidebarWidth() || InitialSidebarWidth)
    }, [])

    const { setGutter, setRoot, moving } = useSplit({ onDragEnd, minWidth: MinWidth, widthClosed: WidthClosed })
    return (
        <div ref={setRoot} className='flex h-full w-screen overflow-x-hidden'>
            <div className={`min-h-screen bg-sidebar-main ${(!moving) && 'transition-all ease-in-out'} overflow-x-hidden`} style={{ width: savedWidth }}>
                {!hideSidebar && sidebar}
            </div>
            <div className={`relative min-h-screen w-1 cursor-move bg-sidebar-main transition-all ease-in-out hover:w-2 hover:bg-border-main`}
                ref={setGutter} >
                <IconButton name='toggle-sidebar'
                    onClick={(e) => {
                        e.stopPropagation()
                        if (hideSidebar) {
                            const w = getVisibleSidebarWidth() || InitialSidebarWidth
                            updateWidth(w, w)
                        } else {
                            updateWidth(WidthClosed)
                        }
                    }}
                    className='absolute right-1/2 top-2 translate-x-1/2 rounded-full border border-border-dark bg-surface-main p-1' >
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