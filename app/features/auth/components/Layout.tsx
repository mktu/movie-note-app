import type { ReactNode, FC } from "react";
import { useTranslation } from "react-i18next";
import Stars from '~/components/icons/Stars'

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    const { t } = useTranslation('common')
    return (
        <div className='w-screen h-screen flex'>
            <div className='flex-1 bg-primary-main'>
                <div className='text-onprimary-main p-12'>
                    <div className='flex items-center'>
                        <Stars className='w-16 h-16' />
                        <div className=' text-4xl font-bold'>Movie Note App</div>
                    </div>
                    <div className='mt-5 px-2'>
                        <div>{t('login-title-message')}</div>
                    </div>
                </div>
            </div>
            <div className='min-w-[40%]'>{children}</div>
        </div>
    )
}

export default Layout