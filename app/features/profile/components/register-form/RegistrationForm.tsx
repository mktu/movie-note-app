import type { MouseEventHandler } from 'react';
import useImageInput from '~/hooks/useImageInput';
import { useFormContext } from '~/providers/form/Context';

import useProfileRegister from '../../hooks/useProfileRegister';
import Layout from './Layout';

type Props = Parameters<typeof useProfileRegister>[0] & {
    image?: string | null,
    error?: string,
    singleColumn?: boolean,
    handleCancel?: MouseEventHandler<HTMLButtonElement> | undefined
}

const RegistrationForm: React.FC<Props> = ({ error, handleCancel, singleColumn, ...params }) => {
    const { useTransitionState } = useFormContext();
    const transitionState = useTransitionState()
    const { nickname, isSubmittable, errors, comment } = useProfileRegister(params)
    const { handleChangeFile, fileUrl } = useImageInput()
    return (
        <Layout
            singleColumn={singleColumn}
            error={error}
            imageProps={{
                src: fileUrl || params.image || '',
                handleChangeFile
            }}
            inputProps={{
                nickname, comment, errors
            }}
            update={Boolean(params.nickname)}
            disabled={(!fileUrl && !isSubmittable) || transitionState !== 'idle'}
            handleCancel={handleCancel}
        />
    )
}

export default RegistrationForm