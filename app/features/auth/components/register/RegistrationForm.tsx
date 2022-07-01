import { Form, useTransition } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { ContainedButton } from "~/components/buttons"
import { TextInput } from "~/components/inputs"
import useProfileRegister from "../../hooks/useProfileRegister"
import ValidationTransition from "../ValidationTransition"

const RegistrationForm: React.FC = () => {
    const { t } = useTranslation('common')
    const transition = useTransition();
    const { nickname, valid, errors } = useProfileRegister()
    return (
        <Form method='post' className='flex w-[50%] flex-col'>
            <ValidationTransition className='mt-2 w-full text-sm text-error-main' show={Boolean(errors[nickname.name])}>
                {errors[nickname.name]?.message?.toString()}
            </ValidationTransition>
            <label htmlFor={nickname.name}>Nick Name</label>
            <TextInput
                title="must be alphanumeric in 6-12 chars"
                className='mt-2 w-full' aria-label={nickname.name} id={nickname.name}
                {...nickname}
            />
            <div className='my-2' />
            <ContainedButton disabled={!valid || transition.state !== 'idle'} className='mt-5 w-full' type='submit'>{t('register')}</ContainedButton>
        </Form>
    )
}

export default RegistrationForm