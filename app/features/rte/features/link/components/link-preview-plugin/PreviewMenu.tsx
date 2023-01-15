import type { AutoEmbedOption } from '@lexical/react/LexicalAutoEmbedPlugin';
import type { MenuRenderFn } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import clsx from 'clsx';
import { useState } from 'react'
import { usePopper } from 'react-popper';

const PreviewMenu: MenuRenderFn<AutoEmbedOption> = (anchorElementRef, {
    selectedIndex, options, selectOptionAndCleanUp, setHighlightedIndex
}) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(anchorElementRef.current, popperElement, {
        placement: 'bottom-end'
    });
    return (
        <div style={{ ...styles.popper, zIndex: 10 }}
            {...attributes.popper} className={clsx(
                'transition-opacity duration-500',
            )} ref={(e) => {
                e && setPopperElement(e)
            }}>
            <ul className='flex max-w-[312px] flex-col gap-1 overflow-hidden rounded bg-bg-main p-1 text-sm shadow-md'>
                {options.map((option, idx) => (
                    <li
                        role='option'
                        aria-selected={selectedIndex === idx}
                        className={clsx(
                            'cursor-pointer px-1 text-text-label hover:bg-surface-hover hover:text-text-main',
                            selectedIndex === idx && 'bg-surface-hover text-text-main'
                        )}
                        key={option.key}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                setHighlightedIndex(idx)
                                selectOptionAndCleanUp(option)
                            }
                        }}
                        onMouseEnter={() => {
                            setHighlightedIndex(idx)
                        }}
                        onClick={() => {
                            setHighlightedIndex(idx)
                            selectOptionAndCleanUp(option)
                        }}
                    >{option.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PreviewMenu;