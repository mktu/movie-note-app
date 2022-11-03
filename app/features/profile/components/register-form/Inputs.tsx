import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextArea, TextInput } from '~/components/inputs';
import { ValidationTransition } from '~/components/transitions';
import type useProfileRegister from '../../hooks/useProfileRegister';

type Props = {
    inputProps: Pick<ReturnType<typeof useProfileRegister>, 'comment' | 'nickname' | 'errors'>
}

const Inputs: FC<Props> = ({
    inputProps
}) => {
    const { nickname, comment, errors } = inputProps
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full flex-col gap-2'>
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
        </div>
    );
};

export default Inputs;