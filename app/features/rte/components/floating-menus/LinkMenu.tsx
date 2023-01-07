import type { LexicalEditor, RangeSelection } from 'lexical';
import { $isRangeSelection } from 'lexical';
import type { FC } from 'react';
import { useCallback, useState } from 'react'
import { $isLinkNode } from '@lexical/link';
import { useRangeSelectionUpdateListener } from '../../hooks/useUpdateListener';
import { getSelectedNode } from '../../utils/linkInserter';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import LinkSlash from '~/components/icons/LinkSlash';
import { useLinkListener } from '../../store/link';


const LinkMenu: FC = () => {
    const [linkElement, setLinkElement] = useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(linkElement, popperElement, {
        placement: 'bottom-end'
    });
    const updateListener = useCallback((selection: RangeSelection, editor: LexicalEditor) => {
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection)
            const parent = node.getParent()
            if ($isLinkNode(parent)) {
                const element = editor.getElementByKey(parent.getKey())
                setLinkElement(element);
            } else if ($isLinkNode(node)) {
                const element = editor.getElementByKey(node.getKey())
                setLinkElement(element);
            } else {
                setLinkElement(null);
            }
        }
    }, [])
    useRangeSelectionUpdateListener(updateListener)
    const { url } = useLinkListener()
    return linkElement ? (
        <div style={{ ...styles.popper, zIndex: 10 }}
            {...attributes.popper} className={clsx(
                'transition-opacity duration-500',
                'm-2'
            )} ref={(e) => {
                e && setPopperElement(e)
            }}>
            <div className='flex items-center max-w-[312px] text-sm rounded p-1 overflow-hidden bg-bg-main gap-1 shadow-md'>
                <LinkSlash className='h-3 w-3 fill-text-label block' />
                <a href={url} target="_blank" rel="noopener noreferrer" className='w-full truncate underline block'>{url}</a>
            </div>
        </div>
    ) : null;
};

export default LinkMenu;