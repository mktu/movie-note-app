import type { FC } from 'react';
import { useState } from 'react'
import { TextButton } from '../../buttons';
import X from '../../icons/X';
import AngleDown from '../../icons/AngleDown';
import Settings from './Settings';

type Props = {
    counters: { [k: string]: number }
}

const Performance: FC<Props> = ({
    counters
}) => {
    const [show, setShow] = useState(true)
    return (
        <div className='fixed top-0 right-0 flex flex-col gap-2 rounded-bl bg-slate-500 p-3 opacity-90'>
            {show ? (
                <>
                    <h3 className='text-onprimary-main'>Performances</h3>
                    <hr className='w-full border-b' />
                    <Settings />
                    <hr className='w-full border-b' />
                    <div>
                        {Object.keys(counters).map(key => (
                            <div key={key} className='flex items-center text-onprimary-main'>
                                <span className='mr-2'>{key}</span>
                                <span>{counters[key]}(ms)</span>
                            </div>
                        ))}
                    </div>
                    <TextButton onClick={() => { setShow(false) }} className='flex items-center font-semibold text-onprimary-main' paddings='px-0'>
                        <X className='mr-2 h-5 w-5 fill-onprimary-main' />
                        <span>Hide</span>
                    </TextButton>
                </>
            ) : (
                <TextButton onClick={() => { setShow(true) }} className='flex items-center font-semibold text-onprimary-main' paddings='px-0'>
                    <AngleDown className='h-5 w-5 fill-onprimary-main' />
                </TextButton>
            )}
        </div>
    );
};

export default Performance;