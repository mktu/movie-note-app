import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil';

import LocalstorageProvider from './localstorage';
import RemixProvider from './navigator/RemixProvider';

type Props = {
    children: ReactNode
}

const RootProviders: FC<Props> = ({ children }) => {
    return (
        <RemixProvider>
            <RecoilRoot>
                <LocalstorageProvider>
                    {children}
                </LocalstorageProvider>
            </RecoilRoot>
        </RemixProvider>
    );
};

export default RootProviders;