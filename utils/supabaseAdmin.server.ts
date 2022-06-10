import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

export type AdminClientType = ReturnType<typeof createClient>
export type SupabaseUserType = User

let supabaseAdmin : AdminClientType | null = null
const getSupabaseAdmin = (context: any) => {
    if(supabaseAdmin){
        return supabaseAdmin
    }
    const supabaseUrl = context.APP_SUPABASE_URL
    const supabaseAnonKey = context.APP_SUPABASE_ANON_KEY
    console.log(supabaseUrl)
    supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
        fetch: (req,init,...args) => {
            return fetch(req, init, ...args)
        },
    })
    return supabaseAdmin
}

export {
    getSupabaseAdmin,
}