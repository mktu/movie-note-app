import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { NodeKey } from 'lexical';
import { $getNodeByKey } from 'lexical';
import type { FC } from 'react';
import { useCallback, useEffect } from 'react'
import { uploadFile } from '~/features/rte/utils/fileUploader';
import { $createImageNode } from './ImageNode';

type Props = {
    file: File,
    nodeKey: NodeKey
}

const ImageLoader: FC<Props> = ({ file, nodeKey }) => {
    const [editor] = useLexicalComposerContext();
    const uploader = useCallback(async () => {
        const result = await uploadFile(file)
        if (!result) {
            return
        }
        editor.update(() => {
            const node = $createImageNode({ altText: result.altText, src: result.src })
            const target = $getNodeByKey(nodeKey)
            target?.replace(node)
        })
    }, [file, editor, nodeKey])
    useEffect(() => {
        uploader()
    }, [uploader])
    return null;
};

export default ImageLoader;