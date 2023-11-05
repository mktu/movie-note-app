import { FocusTrap } from '@headlessui/react';
import clsx from 'clsx';
import { useState, type FC } from 'react'
import { usePopper } from 'react-popper';
import { TextButton } from '~/components/buttons';
import AddIcon from '~/components/icons/Add';
import { TemplateNodePopup } from '../../features/templates/components';
import { useRangeUpdater } from '../../hooks/useUpdater';
import { $createLinkPreviewPlaceholderNode } from '../../features/link/components/link-preview-plugin/simple-link-preview/LinkPreviewPlaceholderNode';
import { $isRootOrShadowRoot, $createParagraphNode, type RangeSelection } from 'lexical';
import { $wrapNodeInElement } from '@lexical/utils';



const TemplateNode: FC = () => {
    const [showTemplateNodeMenu, setShowTemplateNodeMenu] = useState(false)
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto'
    });
    const { updateRange } = useRangeUpdater()
    const templateNodes =
        [
            {
                name: 'Imdbの映画情報', createDom: (selection: RangeSelection) => {
                    const node = $createLinkPreviewPlaceholderNode('$imdbPlaceholder')
                    selection.insertNodes([node])
                    if ($isRootOrShadowRoot(node.getParentOrThrow())) {
                        $wrapNodeInElement(node, $createParagraphNode).selectEnd();
                    }
                }
            },
            {
                name: 'youtubeプレビュー', createDom: (selection: RangeSelection) => {
                    const node = $createLinkPreviewPlaceholderNode('$youtubePlaceholder')
                    selection.insertNodes([node])
                    if ($isRootOrShadowRoot(node.getParentOrThrow())) {
                        $wrapNodeInElement(node, $createParagraphNode).selectEnd();
                    }
                }
            },
        ]
    return (
        <div className=''>
            <TextButton
                paddings=''
                ref={(el) => {
                    el && setReferenceElement(el)
                }} name={'link'} className={clsx('flex items-center gap-1 p-1 text-text-label hover:bg-surface-hover'
                )} onClick={(e) => {
                    setShowTemplateNodeMenu(true)
                }}>
                <AddIcon className='h-5 w-5 fill-text-label' />
                <span>Template Node</span>
            </TextButton>
            {showTemplateNodeMenu && (
                <FocusTrap>
                    <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 20 }}
                        {...attributes.popper} className='bg-bg-main'>
                        <TemplateNodePopup
                            templateNodes={templateNodes}
                            onCancel={() => {
                                setShowTemplateNodeMenu(false)
                            }}
                            onSelect={(selected) => {
                                const template = templateNodes.find(v => v.name === selected.name)
                                template && updateRange((selection) => {
                                    template.createDom(selection)
                                })
                                setShowTemplateNodeMenu(false)
                            }}
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};

export default TemplateNode;