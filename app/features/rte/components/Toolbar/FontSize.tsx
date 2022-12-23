import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Dropdown from '~/components/dropdown';
import type { HeadingTagType } from "@lexical/rich-text";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, } from 'lexical';
import { $setBlocksType_experimental } from '@lexical/selection';

const SupportedBlockType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const FontSize: FC = () => {
    const [type, setType] = useState('')
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                const anchorNode = selection.anchor.getNode();
                const targetNode =
                    anchorNode.getKey() === "root"
                        ? anchorNode
                        : anchorNode.getTopLevelElementOrThrow();

                if ($isHeadingNode(targetNode)) {
                    const tag = targetNode.getTag();
                    setType(tag);
                } else {
                    const nodeType = targetNode.getType();
                    if (nodeType in SupportedBlockType) {
                        setType(nodeType);
                    } else {
                        setType("normal");
                    }
                }
            });
        });
    }, [editor]);
    return (
        <Dropdown selected={type} onSelect={(selectedType: string) => {
            if (type !== selectedType) {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection) && selectedType !== 'normal') {
                        $setBlocksType_experimental(selection, () =>
                            $createHeadingNode(selectedType as HeadingTagType),
                        );
                    }
                });
            }
        }} />
    );
};

export default FontSize;
