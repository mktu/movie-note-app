import type { ComponentProps, FC } from 'react';
import { lazy, Suspense } from 'react'

const Editor = lazy(() => import('./Editor'));

type Props = ComponentProps<typeof Editor>

const Container: FC<Props> = (props) => {
    return (
        <Suspense fallback={<div />}>
            <Editor {...props} />
        </Suspense>
    );
};

export default Container;