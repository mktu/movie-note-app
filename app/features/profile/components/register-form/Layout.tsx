import type { ComponentProps, FC, MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton, OutlinedButton } from '~/components/buttons';
import { useFormContext } from '~/providers/form/Context';
import Error from './Error';
import Image from './Image'
import Inputs from './Inputs'

type Props = {
    imageProps: Pick<ComponentProps<typeof Image>, 'handleChangeFile' | 'src'>
    inputProps: ComponentProps<typeof Inputs>['inputProps']
    error?: string,
    singleColumn?: boolean,
    disabled?: boolean,
    update?: boolean,
    handleCancel?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Layout: FC<Props> = ({
    imageProps,
    inputProps,
    error,
    singleColumn,
    disabled,
    update,
    handleCancel
}) => {
    const { t } = useTranslation('common')
    const { form: Form } = useFormContext();
    const errorComponent = error && <Error error={error} />
    if (singleColumn) {
        return (
            <Form method='post' encType='multipart/form-data' className='flex size-full flex-col items-center justify-center gap-2'>
                <h1 className='my-4 text-text-main'>{t('registration')}</h1>
                {errorComponent}
                <div className='flex  w-full flex-col items-center gap-6'>
                    <div>
                        <Image {...imageProps} width={256} height={256} />
                    </div>
                    <div className='w-1/2'>
                        <Inputs inputProps={inputProps} />
                    </div>
                </div>
                <ContainedButton disabled={disabled} className='mt-4 w-[256px]' type='submit'>{
                    update ? t('update') : t('register')}
                </ContainedButton>
                <OutlinedButton className='w-[256px]' onClick={handleCancel}>{t('cancel-register')}</OutlinedButton>
            </Form>
        )
    }
    return (
        <Form method='post' encType='multipart/form-data' className='flex size-full flex-col items-center'>
            <div className='flex justify-center pt-4'>{errorComponent}</div>
            <div className='flex size-full items-center justify-center gap-6 p-8'>
                <div>
                    <Image {...imageProps} width={192} height={192} />
                </div>
                <div className='flex w-1/2 flex-col gap-2'>
                    <Inputs inputProps={inputProps} />
                    <ContainedButton disabled={disabled} className='mt-5 w-full' type='submit'>{
                        update ? t('update') : t('register')}
                    </ContainedButton>
                    {!update && (
                        <OutlinedButton className='w-full' onClick={handleCancel}>{t('cancel-register')}</OutlinedButton>
                    )}
                </div>
            </div>

        </Form>
    );
};

export default Layout;