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
        <Form method='post' className='w-[50%] flex flex-col'>
            <ValidationTransition className='text-sm text-error-main mt-2 w-full' show={Boolean(errors[nickname.name])}>
                {errors[nickname.name]?.message?.toString()}
            </ValidationTransition>
            <label htmlFor={nickname.name}>Nick Name</label>
            <TextInput
                title="must be alphanumeric in 6-12 chars"
                className='mt-2 w-full' aria-label={nickname.name} id={nickname.name}
                {...nickname}
            />
            <div className='my-2' />
            <ContainedButton disabled={!valid || transition.state !== 'idle'} className='w-full mt-5' type='submit'>{t('register')}</ContainedButton>
        </Form>
    )
}

export default RegistrationForm