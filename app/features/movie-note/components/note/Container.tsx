import type { FC } from 'react';
import { lazy, Suspense } from 'react'

const Editor = lazy(() => import('./Editor'));

type Props = {
    setContentGetter: (fun: () => string) => void
}

const Container: FC<Props> = (props) => {
    return (
        <Suspense fallback={<div />}>
            <Editor {...props} />
        </Suspense>
    );
};

export default Container;