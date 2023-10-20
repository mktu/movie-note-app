import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { UnboxReturnedPromise } from '~/types/utils'

export const listTemplate = async (supabaseAdmin: AdminClientType, userId: string) => {
    const query = supabaseAdmin.from('note_template')
        .select('*')
        .or(`public.eq.TRUE,user_id.eq.${userId}`)
    const { data, error } = await query
    if (error || !data) {
        return []
    }
    return data
}

export type ListTemplateType = UnboxReturnedPromise<typeof listTemplate>