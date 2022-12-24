import type { FC } from 'react';
import { useCallback, useState } from 'react';
import Dropdown from '~/features/rte/components/Toolbar/dropdown';

import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType_experimental } from '@lexical/selection';

import { useNodeUpdateListener } from '../../hooks/useUpdateListener';

import type { HeadingTagType } from "@lexical/rich-text";
import type { NodeListenerType } from '../../hooks/useUpdateListener';
import { useRangeUpdater } from '../../hooks/useUpdater';
import { $createParagraphNode } from 'lexical';

const Blocks: { [key: string]: { label: string } } = {
    normal: { label: 'Normal' },
    h1: { label: 'Heading 1' },
    h2: { label: 'Heading 2' },
    h3: { label: 'Heading 3' },
    h4: { label: 'Heading 4' },
    h5: { label: 'Heading 5' },
    h6: { label: 'Heading 6' }
}

const FontSize: FC = () => {
    const [type, setType] = useState('')
    const listener: NodeListenerType = useCallback((targetNode) => {
        if ($isHeadingNode(targetNode)) {
            const tag = targetNode.getTag();
            setType(tag);
        } else {
            const nodeType = targetNode.getType();
            if (nodeType in Blocks) {
                setType(nodeType);
            } else {
                setType("normal");
            }
        }
    }, [])
    useNodeUpdateListener(listener)
    const { updateRange } = useRangeUpdater()
    return (
        <Dropdown
            menuItems={Blocks}
            selected={type}
            onSelect={(selectedType: string) => {
                if (type === selectedType) {
                    return
                }
                updateRange((selection) => {
                    $setBlocksType_experimental(selection, () =>
                        selectedType !== 'normal' ? $createHeadingNode(selectedType as HeadingTagType) :
                            $createParagraphNode(),
                    );
                })
            }} />
    );
};

export default FontSize;
