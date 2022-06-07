import type { Auth } from '@type-defs/index'
import type { AdminClientType } from './supabaseAdmin.server'

const getAuth = async (supabaseAdmin : AdminClientType, id:string)=> {
    const { data } = await supabaseAdmin.from<Auth>('auth').select('id').eq('id', id)
    return data
}

const hasAuth = async (supabaseAdmin : AdminClientType, id:string)=> {
    const ret = await getAuth(supabaseAdmin, id)
    return ret && ret.length > 0
}

export {
    hasAuth,
    getAuth,
}