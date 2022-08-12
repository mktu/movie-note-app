import { useState, useEffect, useCallback } from "react";
import type { FC, ReactNode } from "react";
import { IconButton } from "~/components/buttons";
import AnglesRight from "~/components/icons/AnglesRight";


type Props = {
    sidebar: ReactNode,
    children: ReactNode
}

const useSplit = ({
    min,
    onMinReached,
    onDragStart
}: {
    min: number,
    onMinReached?: (width: number) => void,
    onDragStart?: (e: MouseEvent) => void
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
        let dragStarted = false
        const dragstart = (e: MouseEvent) => {
            e.preventDefault()
            dragStarted = true
            setMoving(true)
            onDragStart && onDragStart(e)
        }
        const stop = () => {
            dragStarted = false
            setMoving(false)
        }
        const move = (e: MouseEvent) => {
            if (!dragStarted) {
                return
            }
            if (e.clientX <= min) {
                stop()
                onMinReached && onMinReached(e.clientX)
                return
            }
            root.children[0].setAttribute('style', `width:${e.clientX}px`);
        }

        gutter.addEventListener('mousedown', dragstart)
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', stop)

        return () => {
            gutter.removeEventListener('mousedown', dragstart)
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseup', stop)
        }
    }, [root, gutter, min, onMinReached, onDragStart])
    return {
        setRoot,
        setGutter,
        moving
    }
}

const Layout: FC<Props> = ({ sidebar, children }) => {
    const [hideSidebar, setHideSidebar] = useState(false)
    const onMinReached = useCallback(() => { setHideSidebar(true) }, [])
    const { setGutter, setRoot, moving } = useSplit({ min: 200, onMinReached })
    return (
        <div ref={setRoot} className='flex h-full w-screen overflow-x-hidden'>
            <div className={`relative min-h-screen bg-sidebar-main ${(!moving) && 'transition-all ease-in-out'}`} style={{ width: hideSidebar ? 50 : 250 }}>
                {!hideSidebar && sidebar}
                {hideSidebar && (
                    <IconButton name='open-sidebar'
                        onClick={() => { setHideSidebar(false) }}
                        className='absolute right-1/2 top-5 translate-x-1/2 rounded border border-border-dark bg-surface-main p-1' >
                        <AnglesRight className='h-5 w-5 fill-border-dark' />
                    </IconButton>
                )}
            </div>
            <div className={`min-h-screen ${hideSidebar ? 'w-0' : 'w-1'} cursor-move bg-sidebar-main transition-all ease-in-out hover:w-2 hover:bg-border-main`}
                ref={setGutter} />
            <div className={`h-full min-h-screen w-full flex-1 overflow-x-hidden border-border-main`}>{children}</div>
        </div>
    )
}

export default Layout