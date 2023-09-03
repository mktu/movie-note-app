import type { EditorState } from "lexical";
import { useEffect, useRef } from "react";

const useEditorState = (setContentGetter: (fun: () => string) => void,
    monitorCurrentState?: (data: string) => void) => {
    const editorStateRef = useRef<EditorState>();
    useEffect(() => {
        setContentGetter(() => {
            return editorStateRef.current ? JSON.stringify(editorStateRef.current) : ''
        })
    }, [setContentGetter])

    useEffect(() => {
        if (!monitorCurrentState) {
            return
        }
        const id = setInterval(() => {
            editorStateRef.current && monitorCurrentState(JSON.stringify(editorStateRef.current))
        }, 1000);
        return () => {
            clearInterval(id)
        }
    }, [monitorCurrentState])
    return {
        editorStateRef
    }
}

export default useEditorState