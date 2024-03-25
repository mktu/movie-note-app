import type { ReactNode, FC } from "react";
import { useTranslation } from "react-i18next";
import Stars from '~/components/icons/Stars'

type Props = {
    children: ReactNode,
    titleMessage?: string
}

const WebLayout: FC<Props> = ({ children,
    titleMessage = 'login-title-message'
}) => {
    const { t } = useTranslation('common')
    return (
        <div className='w-screen lg:flex lg:h-screen'>
            <div className='flex-1 bg-primary-main'>
                <div className='p-12 text-onprimary-main'>
                    <div className='flex items-center'>
                        <Stars className='h-16 w-16 fill-white' />
                        <div className=' text-4xl font-bold'>Movie Note App</div>
                    </div>
                    <div className='mt-5 px-2'>
                        <div>{t(titleMessage)}</div>
                    </div>
                </div>
            </div>
            <div className='min-w-[40%] pt-20 lg:pt-0'>{children}</div>
        </div>
    )
}

export default WebLayout