import type { UserView } from '@type-defs/index'
import { v4 as uuidv4 } from 'uuid';
import type { AdminClientType } from '../../supabaseAdmin.server'

const registerUser = async (supabaseAdmin : AdminClientType, user_id : string, name : string) => {
    const uuid = uuidv4()
    const { error } = await supabaseAdmin.rpc('add_user', {
        id : uuid,
        name : name,
        user_id : user_id
    })
    if(error) {
        console.error(error)
        throw Error('failed to register')
    }   
}

const getUser = async (supabaseAdmin : AdminClientType, id : string) => {
    try{
        const {data} = await supabaseAdmin.from<UserView>('users_view').select('*').eq('auth_id', id)
        return data ? data[0] : null
    }catch(error){
        console.error(error)
        throw Error('failed to getUser')
    }
}

export {
    registerUser,
    getUser
}