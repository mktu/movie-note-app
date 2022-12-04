import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil';

import LocalstorageProvider from './localstorage';
import RemixNavProvider from './navigator/RemixProvider';
import RemixSearchParamProvider from './search-param/RemixProvider';
import RemixFormProvider from './form/RemixProvider';

type Props = {
    children: ReactNode
}

const RootProviders: FC<Props> = ({ children }) => {
    return (
        <RemixNavProvider>
            <RemixFormProvider>
                <RemixSearchParamProvider>
                    <RecoilRoot>
                        <LocalstorageProvider>
                            {children}
                        </LocalstorageProvider>
                    </RecoilRoot>
                </RemixSearchParamProvider>
            </RemixFormProvider>
        </RemixNavProvider>
    );
};

export default RootProviders;