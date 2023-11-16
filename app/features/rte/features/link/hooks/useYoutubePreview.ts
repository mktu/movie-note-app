import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useCallback } from "react";
import { flattenNodes } from "~/features/rte/utils/node";
import { $isYoutubePreviewPlaceholderNode } from "../components/link-preview-plugin/youtube-preview/YoutubePreviewPlaceholderNode";

export const useYoutubePreview = () => {
    const [editor] = useLexicalComposerContext()
    const removePlaceholder = useCallback(() => {
        editor.update(() => {
            const root = $getRoot();
            const preview = flattenNodes(root.getChildren()).find(v => {
                return $isYoutubePreviewPlaceholderNode(v)
            })
            if (preview) {
                preview.remove()
            }
        })
    }, [editor])
    return {
        removePlaceholder
    }
}