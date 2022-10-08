import React, { useState } from 'react';
import { usePopper } from 'react-popper';

import type { PopperChildrenProps } from 'react-popper';

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

export type Props<T extends HTMLElement> = {
    children: Children<T>,
    content: React.ReactNode | string,
    placement?: PopperChildrenProps['placement'],
    disabled?: boolean,
    zIndex?: number
}

export default function Tooltip<T extends HTMLElement>({ children, content, placement = 'auto', disabled, zIndex = 20 }: Props<T>) {
    const [tooltipShow, setTooltipShow] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLElement>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement
    });
    const openLeftTooltip = () => {
        setTooltipShow(true);
    };
    const closeLeftTooltip = () => {
        setTooltipShow(false);
    };
    const childProps = {
        ...children.props,
        ref: (value: T) => {
            if (!value) return; // called when unmounted
            if (children.ref) {
                if (typeof children.ref === 'function') {
                    children.ref(value);
                }
                else {
                    const refObject = children.ref as React.MutableRefObject<T>
                    refObject.current = value;
                }
            }
            setReferenceElement(value)
        },
        onMouseEnter: openLeftTooltip,
        onMouseLeave: closeLeftTooltip
    }

    return (
        <>
            {React.cloneElement(children, childProps)}
            {!disabled && tooltipShow && (typeof content === 'string' ?
                (
                    <div
                        className='z-20'
                        ref={setPopperElement}
                        style={{ ...styles.popper, zIndex }}
                        {...attributes.popper}
                    >
                        <div className='hidden whitespace-nowrap rounded-lg bg-primary-main p-2 text-sm text-surface-main opacity-100 sm:block'>
                            {content}
                        </div>
                    </div>
                ) : (
                    <div className='z-20 hidden sm:block'
                        ref={setPopperElement}
                        style={{ ...styles.popper, zIndex }}
                        {...attributes.popper}> {content}</div>
                ))}
        </>
    );
}