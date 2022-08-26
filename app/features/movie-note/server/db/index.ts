import type { AddMovieNote, MovieNoteTable } from '@type-defs/backend';
import type { AdminClientType } from '@utils/supabaseAdmin.server'
import { fromCode } from '../../utils/error';

const registerMovieNote = async (supabaseAdmin: AdminClientType, movieNote: AddMovieNote) => {
    const { error } = await supabaseAdmin.from<MovieNoteTable>('movie_note').insert({
        tmdb_id: movieNote.tmdbId,
        memo: movieNote.movieMemo,
        user_id: movieNote.userId
    })
    if (error) {
        console.error(error)
        throw fromCode(error.code)
    }
}

export {
    registerMovieNote
}
