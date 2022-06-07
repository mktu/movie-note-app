import { createClient } from '@supabase/supabase-js'

export type AdminClientType = ReturnType<typeof createClient>

let supabaseAdmin : AdminClientType | null = null
const getSupabaseAdmin = (context: any) => {
    if(supabaseAdmin){
        return supabaseAdmin
    }
    const supabaseUrl = context.APP_SUPABASE_URL
    const supabaseAnonKey = context.APP_SUPABASE_ANON_KEY
    supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
        fetch: (req,init,...args) => {
            console.log(init)
            return fetch(req, init, ...args)
        },
    })
    return supabaseAdmin
}

export {
    getSupabaseAdmin,
}