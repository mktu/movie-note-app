import {
    useEffect, type FC, useState
} from 'react'
import { $generateNodesFromDOM } from '@lexical/html';
import { useRangeUpdater } from '../../hooks/useUpdater';
import { $getRoot } from 'lexical';
import AddIcon from '~/components/icons/Add';
import { FocusTrap } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { TextButton } from '~/components/buttons';
import clsx from 'clsx';
import { TemplatePopup } from '../../features/templates/components';

export type Template = {
    name: string,
    id: number,
    template: string | null
}

type Props = {
    templateGetter?: () => Promise<Template[]>
}

const Templates: FC<Props> = ({
    templateGetter
}) => {
    const { updateRange } = useRangeUpdater()
    const [showEditor, setShowEditor] = useState(false)
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto'
    });
    const [templates, setTemplates] = useState<Template[]>([])
    useEffect(() => {
        templateGetter && templateGetter().then(templates => {
            setTemplates(templates)
        })
    }, [templateGetter])
    return (
        <div>
            <TextButton
                paddings=''
                ref={(el) => {
                    el && setReferenceElement(el)
                }} name={'link'} className={clsx('flex items-center gap-1 p-1 text-text-label hover:bg-surface-hover'
                )} onClick={(e) => {
                    setShowEditor(true)
                }}>
                <AddIcon className='h-5 w-5 fill-text-label' />
                <span>Template</span>
            </TextButton>
            {showEditor && (
                <FocusTrap>
                    <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 20 }}
                        {...attributes.popper} className='bg-bg-main'>
                        <TemplatePopup
                            templates={templates}
                            onSelect={(template) => {
                                if (!template.template) {
                                    return
                                }
                                updateRange((selection, editor) => {
                                    const parser = new DOMParser();
                                    const dom = parser.parseFromString(template.template!, 'text/html');
                                    const nodes = $generateNodesFromDOM(editor, dom);
                                    // Select the root
                                    $getRoot().select();

                                    // Insert them at a selection.
                                    selection.insertNodes(nodes);
                                })
                                setShowEditor(false)
                            }}
                            onCancel={() => {
                                setShowEditor(false)
                            }}
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};

export default Templates;