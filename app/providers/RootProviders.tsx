import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil';

import LocalstorageProvider from './localstorage';
import RemixNavProvider from './navigator/RemixProvider';
import RemixFormProvider from './form/RemixProvider';

type Props = {
    children: ReactNode
}

const RootProviders: FC<Props> = ({ children }) => {
    return (
        <RemixNavProvider>
            <RemixFormProvider>
                <RecoilRoot>
                    <LocalstorageProvider>
                        {children}
                    </LocalstorageProvider>
                </RecoilRoot>
            </RemixFormProvider>
        </RemixNavProvider>
    );
};

export default RootProviders;