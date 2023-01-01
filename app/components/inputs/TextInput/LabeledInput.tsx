import clsx from 'clsx';
import { forwardRef, useState } from 'react'
import TextInput from '.';

type Props = Parameters<typeof TextInput>[0]

const LabeledInput = forwardRef<HTMLInputElement, Props>(({ id = 'text-input', placeholder, onFocus, onBlur, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    return (
        <div className='relative'>
            <label className={clsx(
                'absolute pointer-events-none block origin-top-left transition-transform',
                !focus && 'translate-x-4 translate-y-1 scale-100 text-text-placeholder',
                focus && 'translate-x-4 translate-y-[-10px] scale-75 bg-white px-2 text-text-label'
            )} htmlFor={id}>{placeholder}</label>
            <TextInput ref={ref} id={id} onFocus={(e) => {
                setFocus(true)
                onFocus && onFocus(e)
            }} onBlur={() => {
                setFocus(false)
            }} {...props} />
        </div>
    );
});

LabeledInput['displayName'] = 'LabeledInput'

export default LabeledInput;