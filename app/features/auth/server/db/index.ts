import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { UnboxReturnedPromise } from '~/types/utils'

const getAuth = async (supabaseAdmin: AdminClientType, id: string) => {
    const { data, error } = await supabaseAdmin.from('auth').select('id').eq('id', id)
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

export type AuthType = UnboxReturnedPromise<typeof getAuth>

export {
    hasAuth,
    getAuth,
}