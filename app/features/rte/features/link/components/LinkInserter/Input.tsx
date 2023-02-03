import { useEffect, useRef } from 'react';
import { ContainedButton, TextButton } from '~/components/buttons';
import { TextInput } from '~/components/inputs';

import type { FC } from 'react';
import useLinkInserter from '../../hooks/useLinkInserter';
import { useTranslation } from 'react-i18next';
import Unlink from './Unlink';

type Props = {
    init?: string,
    initLabel?: string,
    onSubmit: (link: string, label?: string) => void,
    onCancel: () => void,
    onUnlink: () => void
}

const Input: FC<Props> = ({ init = '', initLabel = '', onSubmit, onCancel, onUnlink }) => {
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
    const { t } = useTranslation('common')
    return (
        <div className='flex w-[312px] flex-col gap-1 rounded border border-border-main p-2'>
            <TextInput
                label={t('display-text') + '*'}
                borderClassName='border-b border-primary-border'
                error={errors['label']?.message as string}
                {...registerLabel}
            />
            <TextInput
                error={errors['url']?.message as string}
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
                label={t('input-url') + '*'}
            />
            <div className='mt-1 flex items-center justify-end gap-1 font-semibold'>
                <Unlink onClick={onUnlink} disabled={init === ''} />
                <TextButton className='ml-auto' onClick={onCancel} theme='label' paddings='py-1 px-2'>CANCEL</TextButton>
                <ContainedButton disabled={!valid} onClick={() => {
                    onSubmit(url, label)
                }} paddings='py-1 px-2'>OK</ContainedButton>
            </div>
        </div>
    );
};

export default Input;