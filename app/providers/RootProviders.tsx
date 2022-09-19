import type { FC, ReactNode } from 'react'
import RemixProvider from './navigator/RemixProvider';
import LocalstorageProvider from './localstorage';
type Props = {
    children: ReactNode
}

const RootProviders: FC<Props> = ({ children }) => {
    return (
        <RemixProvider>
            <LocalstorageProvider>
                {children}
            </LocalstorageProvider>
        </RemixProvider>
    );
};

export default RootProviders;