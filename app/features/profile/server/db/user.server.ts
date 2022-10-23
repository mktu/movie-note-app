import { v4 as uuidv4 } from 'uuid';
import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { UnboxReturnedPromise } from '~/types/utils';

type RegisterArgs = {
    authId: string,
    name: string,
    comment?: string
}

const registerUser = async (supabaseAdmin: AdminClientType, args: RegisterArgs) => {
    const uuid = uuidv4()
    const { error } = await supabaseAdmin.rpc('add_user', {
        id: uuid,
        name: args.name,
        auth_id: args.authId,
        comment: args.comment || ''
    })
    if (error) {
        console.error(error)
        throw Error('failed to register')
    }
}

type UpdateArgs = {
    authId: string,
    name: string,
    comment?: string,
    image?: string
}

const updateUser = async (supabaseAdmin: AdminClientType, args: UpdateArgs) => {
    const { error } = await supabaseAdmin.rpc('update_user', {
        auth_id: args.authId,
        name: args.name,
        comment: args.comment || '',
        image: args.image || ''
    })
    if (error) {
        console.error(error)
        throw Error('failed to register')
    }
}

const getUser = async (supabaseAdmin: AdminClientType, id: string) => {
    try {
        const { data } = await supabaseAdmin.from('users_view').select('*').eq('auth_id', id)
        return data ? data[0] : null
    } catch (error) {
        console.error(error)
        throw Error('failed to getUser')
    }
}
export type UserType = NonNullable<UnboxReturnedPromise<typeof getUser>>

export {
    registerUser,
    updateUser,
    getUser
}