import type { ComponentProps } from 'react'
import type { LexicalComposer } from '@lexical/react/LexicalComposer';
import nodes from './nodes'

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
    namespace: "MovieNote",
    onError: (error) => console.error(error),
    theme: {
        heading: {
            h1: 'text-3xl',
            h2: 'text-2xl',
            h3: 'text-xl',
            h4: 'text-lg',
            h5: 'text-md',
        },
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