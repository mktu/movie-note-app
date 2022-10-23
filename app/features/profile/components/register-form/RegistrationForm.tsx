import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import { TextArea, TextInput } from '~/components/inputs';
import { useFormContext } from '~/providers/form/Context';
import ProfileImage from '../../components/image'

import ValidationTransition from '~/components/transitions/ValidationTransition';
import useProfileRegister from '../../hooks/useProfileRegister';
import useImageInput from '~/hooks/useImageInput';
import Info from '~/components/icons/Info';

type Props = Parameters<typeof useProfileRegister>[0] & {
    image?: string | null,
    error?: string
}

const RegistrationForm: React.FC<Props> = ({ error, ...params }) => {
    const { t } = useTranslation('common')
    const { useTransitionState, form: Form } = useFormContext();
    const transitionState = useTransitionState()
    const { nickname, isSubmittable, errors, comment } = useProfileRegister(params)
    const { handleChangeFile, fileUrl } = useImageInput()

    return (
        <div className='flex h-full w-full flex-col items-center'>
            {error && (
                <div className='flex items-center'>
                    <Info className='mr-1 h-5 w-5 fill-red-500' />
                    <p className="flex-1 text-red-500">{error}</p>
                </div>
            )}
            <Form method='post' encType='multipart/form-data' className='flex h-full w-full items-center justify-center gap-6 p-8'>
                <div className='flex flex-col items-center gap-2'>
                    <ProfileImage
                        width={192}
                        height={192}
                        alt='Not found'
                        src={fileUrl || params.image || ''} />
                    <label className='cursor-pointer rounded border border-primary-main py-2 px-4 text-primary-main hover:border-text-dark' htmlFor='file-upload'>
                        {t('change-image')}
                        <input name='profile-image' id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
                    </label>
                </div>
                <div className='flex w-[50%] flex-col gap-2'>
                    <ValidationTransition className='mt-2 w-full text-sm text-error-main' show={Boolean(errors[nickname.name])}>
                        {errors[nickname.name]?.message?.toString()}
                    </ValidationTransition>
                    <div>
                        <label htmlFor={nickname.name}>{t('nickname')}</label>
                        <TextInput
                            title="must be alphanumeric in 6-12 chars"
                            className='mt-2 w-full' aria-label={nickname.name} id={nickname.name}
                            {...nickname}
                        />
                    </div>
                    <div>
                        <label htmlFor={comment.name}>{t('comment')}</label>
                        <TextArea className='mt-2 w-full' minRows={3} aria-label={comment.name} id={comment.name}  {...comment} />
                    </div>
                    <div />
                    <ContainedButton disabled={(!fileUrl && !isSubmittable) || transitionState !== 'idle'} className='mt-5 w-full' type='submit'>{
                        params.nickname ? t('update') : t('register')}</ContainedButton>
                </div>
            </Form>
        </div>
    )
}

export default RegistrationForm