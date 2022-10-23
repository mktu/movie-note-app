import { createClient } from '@supabase/supabase-js'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/DatabaseDefinitions'

export type AdminClientType = SupabaseClient<Database>
export type SupabaseUserType = User

let supabaseAdmin: AdminClientType | null = null
const getSupabaseAdmin = (context: any) => {
    if (supabaseAdmin) {
        return supabaseAdmin
    }
    const supabaseUrl = context.APP_SUPABASE_URL
    const supabaseSecretKey = context.APP_SUPABASE_SECRET_KEY
    supabaseAdmin = createClient<Database>(supabaseUrl, supabaseSecretKey, {
        global: {
            fetch: (req, init, ...args) => {
                return fetch(req, init, ...args)
            },
        }
    })
    return supabaseAdmin
}

export {
    getSupabaseAdmin,
}