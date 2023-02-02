import type { NodeKey } from 'lexical';
import {
    $getNodeByKey, $getSelection, $isNodeSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW,
    KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';

import ImageConponent from './ImageComponent';
import { $isImageNode } from './ImageNode';

import type { FC } from 'react';

type Props = Parameters<typeof ImageConponent>[0] & {
    nodeKey: NodeKey
}

const Container: FC<Props> = ({ nodeKey, ...props }) => {
    const [isSelected, setSelected, clearSelection] =
        useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const [imgElement, setImgElement] = useState<HTMLImageElement>()

    const onDelete = useCallback(
        (payload: KeyboardEvent) => {
            if (isSelected && $isNodeSelection($getSelection())) {
                const event: KeyboardEvent = payload;
                event.preventDefault();
                const node = $getNodeByKey(nodeKey);
                if ($isImageNode(node)) {
                    node.remove();
                }
                setSelected(false);
            }
            return false;
        },
        [isSelected, nodeKey, setSelected],
    );
    useEffect(() => {
        return mergeRegister(
            editor.registerCommand<MouseEvent>(
                CLICK_COMMAND,
                (payload) => {
                    const event = payload;

                    if (event.target === imgElement) {
                        if (event.shiftKey) {
                            setSelected(!isSelected);
                        } else {
                            clearSelection();
                            setSelected(true);
                        }
                        return true;
                    }

                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_DELETE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_BACKSPACE_COMMAND,
                onDelete,
                COMMAND_PRIORITY_LOW,
            ),
        )
    }, [imgElement, onDelete, clearSelection, editor, isSelected, setSelected])
    return (
        <ImageConponent isSelected={isSelected} onSetImgElement={setImgElement} {...props} />
    );
};

export default Container;