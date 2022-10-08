import Layout from "./Layout";
import Sidebar from './sidebar'
import type { ComponentProps, FC } from 'react'

type Props = Omit<ComponentProps<typeof Layout>, 'sidebar'> & ComponentProps<typeof Sidebar>

const Container: FC<Props> = ({
    children,
    initialSidebarWidth,
    ...sidebarProps
}) => {
    return (
        <Layout
            initialSidebarWidth={initialSidebarWidth}
            sidebar={
                <Sidebar {...sidebarProps} />
            }>
            {children}
        </Layout>
    );
};

export default Container;