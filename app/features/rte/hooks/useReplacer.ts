import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"

type InnerFunction = (content: string) => void
export type GetContentRegister = (f: InnerFunction) => void

export const useReplacer = (register: GetContentRegister) => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        register((content) => {
            editor.update(() => {
                const editorState = editor.parseEditorState(content);
                editor.setEditorState(editorState);
            })
        })
    }, [editor, register])
}