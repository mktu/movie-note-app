import * as authDb from './auth.server'
import * as userDb from './user.server'
import * as movieNoteDb from './movieNote.server'
import { getSupabaseAdmin } from '../../supabaseAdmin.server'

export {
    getSupabaseAdmin,
    authDb,
    userDb,
    movieNoteDb
}