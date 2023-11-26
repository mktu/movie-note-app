import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { AddPublicNote } from '../validation/addPublicNote';
import { throwPublicNoteError } from '../../utils/error';
import type { UnboxReturnedPromise } from '~/types/utils';

export const upsertPublicNote = async (supabaseAdmin: AdminClientType, publicNote: AddPublicNote, userId: string) => {

    const { error } = await supabaseAdmin.from('public-note').upsert({
        tmdb_id: publicNote.tmdbId,
        note: publicNote.note,
        public: publicNote.public,
        summary: publicNote.summary,
        user_id: userId
    })
    if (error) {
        console.error(error)
        throwPublicNoteError(error.code)
    }
}

export const loadPublicNote = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string, throwable?: boolean) => {
    const { data, error } = await supabaseAdmin.from('public-note').select('*').eq('tmdb_id', tmdbId).eq('user_id', userId)
    if (error) {
        console.error(error)
        if (throwable) {
            throwPublicNoteError(error.code)
        }
        return null
    }
    if (!data || data.length === 0) {
        return null
    }
    return data[0]
}

export const hasPublicNote = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string) => {
    const { data, error } = (await supabaseAdmin.from('public-note').select('*').eq('tmdb_id', tmdbId).eq('user_id', userId))
    if (error || !data || data.length === 0) {
        return false
    }
    return true
}

export type PublicNoteType = UnboxReturnedPromise<typeof loadPublicNote>