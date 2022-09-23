import { useState, useEffect } from "react";

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

export default useSplit