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

const loadPublicNoteBase = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string, throwable?: boolean) => {
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

export const deletePublicNote = async (supabaseAdmin: AdminClientType, tmdbId: string) => {
    const { error } = await supabaseAdmin.from('public-note').delete().eq('tmdb_id', tmdbId)
    if (error) {
        console.log(error)
    }
}

export const loadPublicNote = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string) => {
    const data = await loadPublicNoteBase(supabaseAdmin, tmdbId, userId, true)
    return data!
}

export const hasPublicNote = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string) => {
    const data = await loadPublicNoteBase(supabaseAdmin, tmdbId, userId, false)
    return Boolean(data)
}

export type PublicNoteType = UnboxReturnedPromise<typeof loadPublicNote>