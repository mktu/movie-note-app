import type { ComponentProps } from 'react'
import type { LexicalComposer } from '@lexical/react/LexicalComposer';
import nodes from './nodes'

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
    namespace: "MovieNote",
    onError: (error) => console.error(error),
    theme: {
        heading: {
            h1: 'text-3xl my-4',
            h2: 'text-2xl my-3',
            h3: 'text-xl my-2',
            h4: 'text-lg my-1',
            h5: 'text-md',
        },
        list: {
            ol: 'lexical-ol',
            ul: 'lexical-ul',
            nested: {
                listitem: 'list-none',
            },
        },
    },
    nodes
};

export default initialConfig