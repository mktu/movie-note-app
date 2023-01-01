import { forwardRef } from 'react'
import Input from './Input';
import LabeledInput from './LabeledInput';

type Props = Parameters<typeof Input>[0] & {
    label?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ label, ...props }, ref) => {
    if (label) {
        return (
            <LabeledInput ref={ref} placeholder={label} {...props} />
        )
    }
    return (
        <Input ref={ref} {...props} />
    );
});

TextInput['displayName'] = 'text-input'


export default TextInput;