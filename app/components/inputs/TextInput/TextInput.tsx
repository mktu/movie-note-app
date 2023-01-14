import { forwardRef } from 'react'
import Input from './Inner';
import InputError from './InputError';

type Props = Parameters<typeof Input>[0] & {
    error?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ error, ...props }, ref) => {
    return (
        <InputError error={error}>
            <Input ref={ref} {...props} />
        </InputError>
    );
});

TextInput['displayName'] = 'text-input'


export default TextInput;