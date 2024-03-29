import clsx from 'clsx';
import { forwardRef, useRef, useState } from 'react'
import TextInput from './Input';

type Props = Parameters<typeof TextInput>[0] & {
    label: string
}

const LabeledInput = forwardRef<HTMLInputElement, Props>(({ id = 'text-input', placeholder, label, onFocus, onBlur, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    const myRef = useRef<HTMLInputElement>()
    const hasValue = myRef && myRef.current && myRef.current.value !== '' && myRef.current.value != null
    return (
        <div className='relative'>
            <label className={clsx(
                'pointer-events-none absolute block origin-top-left transition-transform',
                !focus && 'top-[50%] translate-x-4 translate-y-[-50%] scale-100 text-text-placeholder',
                focus && 'translate-x-4 translate-y-[-10px] scale-75 bg-white px-2 text-text-label',
                hasValue && !focus && 'invisible bg-red-50'
            )} htmlFor={id}>{label}</label>
            <TextInput
                ref={(e) => {
                    if (e) {
                        myRef.current = e
                    }
                    if (typeof ref === 'function') {
                        ref(e)
                    } else if (ref) {
                        ref.current = e
                    }
                }}
                id={id}
                onFocus={(e) => {
                    setFocus(true)
                    onFocus && onFocus(e)
                }} onBlur={() => {
                    setFocus(false)
                }} {...props} />
        </div>
    );
});

LabeledInput['displayName'] = 'labeled-input'

export default LabeledInput;