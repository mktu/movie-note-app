import type { ComponentProps } from 'react'
import type { LexicalComposer } from '@lexical/react/LexicalComposer';
import nodes from './nodes'

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
    namespace: "MyEditor",
    onError: (error) => console.error(error),
    theme: {
        placeholder: 'editor-placeholder',
        list: {
            ol: 'editor-list-ol',
            ul: 'lexical-ul',
            nested: {
                listitem: 'list-none',
            },
        },
    },
    nodes
};

export default initialConfig