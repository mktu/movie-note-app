import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'

export const convertHtmlFromNode = (nodeString: string) => {
    const editor = createHeadlessEditor({
        nodes: [],
        onError: console.error
    });
    return new Promise<string>((resolve) => {
        editor.setEditorState(editor.parseEditorState(nodeString));
        editor.update(() => {
            const contentAsHTML = $generateHtmlFromNodes(editor);
            resolve(contentAsHTML);
        });
    })
}
