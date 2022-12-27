import { useState } from 'react';
import { IconButton } from '~/components/buttons';
import Check from '~/components/icons/Check';
import { TextInput } from '~/components/inputs';

import type { FC } from 'react';

type Props = {
    init?: string,
    onSubmit: (link: string) => void
}

const Input: FC<Props> = ({ init = '', onSubmit }) => {
    const [editUrl, setEditUrl] = useState(init)
    return (
        <TextInput
            value={editUrl}
            onChange={(e) => {
                setEditUrl(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.preventDefault()
                    onSubmit(editUrl)
                }
            }}
            placeholder='https://'
            addonRight={
                <IconButton name='submit' onClick={() => {
                    onSubmit(editUrl)
                }}>
                    <Check className='h-4 w-4 fill-text-label hover:fill-text-main' />
                </IconButton>
            }
        />
    );
};

export default Input;