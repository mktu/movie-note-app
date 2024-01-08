import type { FC } from 'react'
import type { GetContentRegister } from '../hooks/useReplacer';
import { useReplacer } from '../hooks/useReplacer';

type Props = {
    getContentRegister: GetContentRegister
}

const ReplacePlugin: FC<Props> = ({ getContentRegister }) => {
    useReplacer(getContentRegister)
    return null
};

export default ReplacePlugin;