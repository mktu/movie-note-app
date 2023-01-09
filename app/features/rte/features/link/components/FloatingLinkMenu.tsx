import type { LexicalEditor, RangeSelection } from 'lexical';
import clsx from 'clsx';
import { $isRangeSelection } from 'lexical';
import { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import LinkSlash from '~/components/icons/LinkSlash';

import { $isLinkNode } from '@lexical/link';

import { useRangeSelectionUpdateListener } from '../../../hooks/useUpdateListener';
import { useLinkListener } from '../../../store/link';
import { getSelectedNode } from '../../../utils/linkInserter';

import type { FC } from 'react';
import type { LinkNode } from '@lexical/link';

const showLinkMenu = (node: LinkNode) => {
    return node.getTextContent() !== node.getURL()
}

const FloatingLinkMenu: FC = () => {
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
                showLinkMenu(parent) && setLinkElement(element);
            } else if ($isLinkNode(node)) {
                const element = editor.getElementByKey(node.getKey())
                showLinkMenu(node) && setLinkElement(element);
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
            <div className='flex max-w-[312px] items-center gap-1 overflow-hidden rounded bg-bg-main p-1 text-sm shadow-md'>
                <LinkSlash className='block h-3 w-3 fill-text-label' />
                <a href={url} target="_blank" rel="noopener noreferrer" className='block w-full truncate underline'>{url}</a>
            </div>
        </div>
    ) : null;
};

export default FloatingLinkMenu;