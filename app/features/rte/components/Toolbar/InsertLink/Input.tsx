import { useEffect, useRef, useState } from 'react';
import { ContainedButton, IconButton, OutlinedButton, TextButton } from '~/components/buttons';
import Check from '~/components/icons/Check';
import { TextInput } from '~/components/inputs';

import type { FC } from 'react';

type Props = {
    init?: string,
    onSubmit: (link: string) => void
}

const Input: FC<Props> = ({ init = '', onSubmit }) => {
    const [editUrl, setEditUrl] = useState(init)
    const urlRef = useRef<HTMLInputElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (urlRef) {
            urlRef.current?.focus()
        }
    }, [])
    return (
        <div ref={divRef} className='flex flex-col gap-1 border rounded border-border-main p-2 w-[256px]'>
            <TextInput
                placeholder='ラベル名'
                borderClassName='border-b border-primary-border'
            />
            <TextInput
                ref={urlRef}
                value={editUrl}
                borderClassName='border-b border-primary-border'
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
            />
            <div className='flex items-center justify-end font-semibold mt-1 gap-1'>
                <TextButton theme='label' paddings='py-1 px-2'>CANCEL</TextButton>
                <ContainedButton onClick={() => {
                    onSubmit(editUrl)
                }} paddings='py-1 px-2'>OK</ContainedButton>
            </div>
        </div>
    );
};

export default Input;