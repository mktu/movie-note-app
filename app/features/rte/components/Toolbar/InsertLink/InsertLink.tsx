import { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import { IconButton } from '~/components/buttons';
import Clickaway from '~/components/clickaway';

import { $isLinkNode } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';

import { useNodeUpdateListener } from '../../../hooks/useUpdateListener';
import { useRangeUpdater } from '../../../hooks/useUpdater';
import InsertLink from '../../icons/InsertLink';
import Input from './Input';

import type { ElementNode, RangeSelection, TextNode } from 'lexical';
import { $isTextNode } from 'lexical';
import type { FC } from 'react';
import type { NodeListenerType } from '../../../hooks/useUpdateListener';
import { FocusTrap } from '@headlessui/react';
import { replaceLink, unlink } from '~/features/rte/utils/linkInserter';

export function getSelectedNode(
    selection: RangeSelection,
): TextNode | ElementNode {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
}

const Link: FC = () => {
    const [url, setUrl] = useState('')
    const [label, setLabel] = useState('')
    const [showEditor, setShowEditor] = useState(false)
    const { updateRange } = useRangeUpdater()
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto'
    });
    const listener: NodeListenerType = useCallback((_, selection) => {
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
            setUrl(parent.getURL());
        } else if ($isLinkNode(node)) {
            setUrl(node.getURL());
        } else {
            setUrl('');
        }
    }, [])
    useNodeUpdateListener(listener)
    return (
        <>
            <IconButton
                ref={(el) => {
                    el && setReferenceElement(el)
                }} name={'link'} className={'hover:bg-surface-hover p-1'} onClick={(e) => {
                    e.stopPropagation()
                    setShowEditor(true)
                    updateRange((selection) => {
                        const nodes = selection.extract()
                        if (nodes.length > 0) {
                            setLabel(nodes.filter(v => $isTextNode(v)).map(v => v.getTextContent()).join(''))
                        }
                    })
                }}>
                <InsertLink className={`h-4 w-4 
                ${url !== '' ? 'fill-text-main' : 'fill-text-label'}`} />
            </IconButton>
            {showEditor && (
                <Clickaway
                    onClickAway={() => {
                        setShowEditor(false)
                    }}>
                    <FocusTrap>
                        <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 20 }}
                            {...attributes.popper} className='bg-bg-main'>
                            <Input
                                key={url}
                                init={url}
                                initLabel={label}
                                onCancel={() => {
                                    setShowEditor(false)
                                }}
                                onSubmit={(editUrl, label) => {
                                    setShowEditor(false)
                                    updateRange((selection, editor) => {
                                        replaceLink(selection, editor, editUrl, label)
                                    })
                                }}
                                onUnlink={() => {
                                    setShowEditor(false)
                                    updateRange((selection, editor) => {
                                        unlink(selection, editor)
                                    })
                                }}
                            />
                        </div>
                    </FocusTrap>
                </Clickaway>
            )}
        </>
    );
};
export default Link;