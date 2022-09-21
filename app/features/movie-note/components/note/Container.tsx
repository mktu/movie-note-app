import type { ComponentProps, FC } from 'react';
import Editor from './Editor';
// import { lazy, Suspense } from 'react'
// const Editor = lazy(() => import('./Editor'));

type Props = ComponentProps<typeof Editor>

const Container: FC<Props> = (props) => {
    return (
        <Editor {...props} />
    )
    // cannot use renderToReadableStream 
    // (related isue: https://github.com/remix-run/remix/issues/2299#issuecomment-1091149019)
    // return (
    //     <Suspense fallback={<div />}>
    //         <Editor {...props} />
    //     </Suspense>
    // );
};

export default Container;