/**
 * These hooks re-implement the now removed useBlocker and usePrompt hooks in 'react-router-dom'.
 * Thanks for the idea @piecyk https://github.com/remix-run/react-router/issues/8139#issuecomment-953816315
 * Source: https://github.com/remix-run/react-router/commit/256cad70d3fd4500b1abcfea66f3ee622fb90874#diff-b60f1a2d4276b2a605c05e19816634111de2e8a4186fe9dd7de8e344b65ed4d3L344-L381
 */
import { useContext, useEffect, useCallback, useRef } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import type { Blocker, Transition } from 'history'

/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */
export function useBlocker(blocker: Blocker, when = true) {
    const context = useContext(UNSAFE_NavigationContext);
    const { navigator } = context || {}
    const unblocker = useRef<(() => void)[]>([])
    const unblockFn = useCallback(() => {
        unblocker.current.forEach(fn => {
            fn()
        })
        unblocker.current = []
    }, [])

    useEffect(() => {
        if (!when) return;
        if (!navigator) return;

        // TODO
        // Removing navigator.block in 6.4
        // this should be replaced by storeing unsaved contents in localstorage
        // see https://github.com/remix-run/react-router/issues/8139#issuecomment-1262630360

        // const unblock = (navigator as History).block((tx) => {
        //     const autoUnblockingTx = {
        //         ...tx,
        //         retry() {
        //             // Automatically unblock the transition so it can play all the way
        //             // through before retrying it. TODO: Figure out how to re-enable
        //             // this block if the transition is cancelled for some reason.
        //             unblock();
        //             tx.retry();
        //         },
        //     };

        //     blocker(autoUnblockingTx);
        // });
        // unblocker.current.push(unblock)
        return () => {
            unblockFn()
        };
    }, [navigator, blocker, when, unblockFn]);

    return {
        unblock: unblockFn
    }
}
/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: string, when = true) {
    const blocker = useCallback(
        (tx: Transition) => {
            // eslint-disable-next-line no-alert
            if (window.confirm(message)) tx.retry();
        },
        [message]
    );

    const { unblock } = useBlocker(blocker, when);

    return {
        unblock
    }
}