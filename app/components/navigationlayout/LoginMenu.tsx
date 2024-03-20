import { useCallback, type FC } from 'react'
import { OutlinedButton } from '../buttons';
import LoginIcon from '~/components/icons/Login'
import UserPlusIcon from '~/components/icons/UserPlus'
import { useNavigatorContext } from '~/providers/navigator/Context';

const LoginMenu: FC = () => {
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const onLogin = useCallback(() => {
        navigate('/login')
    }, [navigate])
    return (
        <div className='flex items-center gap-2'>
            <OutlinedButton className='flex items-center gap-2 text-sm text-onprimary-main' onClick={onLogin}>
                <LoginIcon className='h-5 w-5 fill-onprimary-main' />
                LogIn
            </OutlinedButton>
            <OutlinedButton className='flex items-center gap-2 text-sm text-onprimary-main' onClick={onLogin}>
                <UserPlusIcon className='h-5 w-5 fill-onprimary-main' />
                SignUp
            </OutlinedButton>
        </div>
    );
};

export default LoginMenu;