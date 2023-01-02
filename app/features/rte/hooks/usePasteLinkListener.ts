import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PASTE_COMMAND } from "lexical";
import { useEffect } from "react";

const usePasteLinkListener = () => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        return editor.registerCommand(PASTE_COMMAND, (payload) => {
            const clipboardData =
                payload instanceof InputEvent || payload instanceof KeyboardEvent
                    ? null
                    : payload.clipboardData;


            if (clipboardData) {
                const text = clipboardData.getData('text/plain')
                console.log(text)
            }

            return false
        }, 0)
    }, [editor]);
}

export default usePasteLinkListener