import { forwardRef } from 'react'
import Input from './Inner';
import InputError from './InputError';

type Props = Parameters<typeof Input>[0] & {
    error?: string,
    inputClassName?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ error, className, inputClassName, ...props }, ref) => {
    return (
        <InputError error={error} className={className}>
            <Input ref={ref} className={inputClassName} {...props} />
        </InputError>
    );
});

TextInput['displayName'] = 'text-input'


export default TextInput;