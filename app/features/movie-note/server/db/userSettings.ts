import type { AdminClientType } from "@utils/supabaseAdmin.server"


export const updateUserSettings = async (supabaseAdmin: AdminClientType, userId: string, settings: { key: string, value: string }[]) => {
    const upsert = settings.map(v => ({
        user_id: userId,
        ...v
    }))
    await supabaseAdmin.from('user_settings').upsert(upsert);
}