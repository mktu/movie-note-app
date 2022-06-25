import { useForm } from "react-hook-form";

const useRegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const email = register('email', {
        required: "required",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
        }
    })
    const password = register('password', {
        required: "required",
        minLength: {
            value: 5,
            message: "min length is 5"
        }

    })
    const onSubmit = handleSubmit(()=>{})
    return {
        register,
        watch,
        errors,
        email,
        password,
        onSubmit
    }
}

export default useRegisterForm