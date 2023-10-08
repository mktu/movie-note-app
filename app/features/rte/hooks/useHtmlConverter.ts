import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useCallback } from "react"
import { $generateHtmlFromNodes } from '@lexical/html'

export const useHtmlConverter = () => {
    const [editor] = useLexicalComposerContext()
    const convertToHtml = useCallback(() => {
        return new Promise<string>((resolve) => {
            editor.update(() => {
                const result = $generateHtmlFromNodes(editor)
                resolve(result)
            })
        })
    }, [editor])
    return { convertToHtml }
}