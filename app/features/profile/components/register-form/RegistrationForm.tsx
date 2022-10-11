import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import { TextArea, TextInput } from '~/components/inputs';
import { useFormContext } from '~/providers/form/Context';

import ValidationTransition from '~/features/auth/components/ValidationTransition';
import useProfileRegister from '../../hooks/useProfileRegister';

type Props = Parameters<typeof useProfileRegister>[0]

const RegistrationForm: React.FC<Props> = (params) => {
    const { t } = useTranslation('common')
    const { useTransitionState, form: Form } = useFormContext();
    const transitionState = useTransitionState()
    const { nickname, valid, errors, comment } = useProfileRegister(params)
    return (
        <Form method='post' className='flex w-[50%] flex-col gap-2'>
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
            <ContainedButton disabled={!valid || transitionState !== 'idle'} className='mt-5 w-full' type='submit'>{
                params.nickname ? t('update') : t('register')}</ContainedButton>
        </Form>
    )
}

export default RegistrationForm