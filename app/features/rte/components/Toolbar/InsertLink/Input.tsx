import { useEffect, useRef } from 'react';
import { ContainedButton, TextButton } from '~/components/buttons';
import { TextInput } from '~/components/inputs';

import type { FC } from 'react';
import useLinkInserter from '~/features/rte/hooks/useLinkInserter';

type Props = {
    init?: string,
    initLabel?: string,
    onSubmit: (link: string, label?: string) => void,
    onCancel: () => void
}

const Input: FC<Props> = ({ init = '', initLabel = '', onSubmit, onCancel }) => {
    const urlRef = useRef<HTMLInputElement>()
    const { url, label, registerLabel, registerUrl, valid, errors } = useLinkInserter({
        initLabel, initUrl: init
    })
    const { ref: registerUrlRef, ...registerUrlOther } = registerUrl
    useEffect(() => {
        if (urlRef) {
            urlRef.current?.focus()
        }
    }, [])
    return (
        <div className='flex flex-col gap-1 border rounded border-border-main p-2 w-[312px]'>
            <TextInput
                borderClassName='border-b border-primary-border'
                {...registerLabel}
            />
            <TextInput
                ref={(r) => {
                    registerUrlRef(r)
                    if (r) {
                        urlRef.current = r
                    }
                }}
                borderClassName='border-b border-primary-border'
                onKeyDown={(e) => {
                    if (e.key == 'Enter' && valid) {
                        onSubmit(url)
                    }
                }}
                {...registerUrlOther}
                placeholder='https://'
            />
            <div className='flex items-center justify-end font-semibold mt-1 gap-1'>
                <TextButton onClick={onCancel} theme='label' paddings='py-1 px-2'>CANCEL</TextButton>
                <ContainedButton disabled={!valid} onClick={() => {
                    onSubmit(url, label)
                }} paddings='py-1 px-2'>OK</ContainedButton>
            </div>
        </div>
    );
};

export default Input;