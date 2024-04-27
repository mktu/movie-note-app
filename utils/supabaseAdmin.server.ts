import type { AppLoadContext } from '@remix-run/cloudflare'
import { createClient } from '@supabase/supabase-js'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/DatabaseDefinitions'

export type AdminClientType = SupabaseClient<Database>
export type SupabaseUserType = User

const getSupabaseAdmin = (context: AppLoadContext) => {
    const { cloudflare: { env } } = context
    return getSupabaseAdminFunction(env)
}

const getSupabaseAdminFunction = (env: Env) => {
    const supabaseUrl = env.APP_SUPABASE_URL
    const supabaseSecretKey = env.APP_SUPABASE_SECRET_KEY
    const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseSecretKey, {
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
    getSupabaseAdminFunction
}