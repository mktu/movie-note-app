import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type EditorElementType = HTMLElement | null

export const editorElementType = atom<EditorElementType>({
    key: 'movie-note-editor',
    default: null
});

export const useEditorElement = () => {
    const setEditorElement = useSetRecoilState(editorElementType)
    const editorElement = useRecoilValue(editorElementType)

    return {
        setEditorElement,
        editorElement
    }
}