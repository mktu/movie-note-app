import clsx from 'clsx';
import { $isTextNode } from 'lexical';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { IconButton } from '~/components/buttons';
import { useLinkListener } from '~/features/rte/store/link';
import { replaceLink, unlink } from '~/features/rte/utils/linkInserter';

import { FocusTrap } from '@headlessui/react';

import { useNodeUpdateListener } from '../../../../hooks/useUpdateListener';
import { useRangeUpdater } from '../../../../hooks/useUpdater';
import InsertLink from '../../../../components/icons/InsertLink';
import Input from './Input';

import type { FC } from 'react';

const LinkInserter: FC = () => {
    const [label, setLabel] = useState('')
    const [showEditor, setShowEditor] = useState(false)
    const { updateRange } = useRangeUpdater()
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto'
    });
    const { listener, url, valid } = useLinkListener()
    useNodeUpdateListener(listener)

    return (
        <>
            <IconButton
                disabled={!valid}
                ref={(el) => {
                    el && setReferenceElement(el)
                }} name={'link'} className={clsx(valid && 'hover:bg-surface-hover',
                    'p-1'
                )} onClick={(e) => {
                    e.stopPropagation()
                    setShowEditor(true)
                    updateRange((selection) => {
                        const nodes = selection.extract()
                        if (nodes.length > 0) {
                            setLabel(nodes.filter(v => $isTextNode(v)).map(v => v.getTextContent()).join(''))
                        }
                    })
                }}>
                <InsertLink className={`h-5 w-5
                ${!valid ? 'fill-text-disabled' : url !== '' ? 'fill-text-main' : 'fill-text-label'}`} />
            </IconButton>
            {showEditor && (
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
            )}
        </>
    );
};
export default LinkInserter;