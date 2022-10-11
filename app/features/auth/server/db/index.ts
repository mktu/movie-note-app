import type { Auth } from '@type-defs/backend/index'
import type { AdminClientType } from '@utils/supabaseAdmin.server'

const getAuth = async (supabaseAdmin: AdminClientType, id: string) => {
    const { data, error } = await supabaseAdmin.from<Auth>('auth').select('id').eq('id', id)
    if (error) {
        console.error(error)
        throw Error('Something happened in get auth from db')
    }
    return data
}

const hasAuth = async (supabaseAdmin: AdminClientType, id: string) => {
    const ret = await getAuth(supabaseAdmin, id)
    return ret && ret.length > 0
}

export {
    hasAuth,
    getAuth,
}