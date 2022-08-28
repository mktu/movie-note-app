import type { AddMovieNote, MovieInfoTable, MovieNoteTable } from '@type-defs/backend';
import type { AdminClientType } from '@utils/supabaseAdmin.server'
import { fromCode } from '../../utils/error';

const registerMovieNote = async (supabaseAdmin: AdminClientType, movieNote: AddMovieNote) => {

    const { data } = await supabaseAdmin.from<MovieInfoTable>('movie_info').select('id').eq('tmdb_id', movieNote.tmdbId)
    if (!data || data.length === 0) {
        const { error: infoError } = await supabaseAdmin.from<MovieInfoTable>('movie_info').insert({
            tmdb_id: movieNote.tmdbId,
            title: movieNote.title,
            thumbnail: movieNote.thumbnail,
            lng: movieNote.lng
        })
        if (infoError) {
            console.error(infoError)
            throw fromCode(infoError.code)
        }
    }
    const { error: noteError } = await supabaseAdmin.from<MovieNoteTable>('movie_note').insert({
        tmdb_id: movieNote.tmdbId,
        memo: movieNote.movieMemo,
        user_id: movieNote.userId,
        admiration_date: movieNote.admirationDate || null,
        stars: movieNote.stars,
        lng: movieNote.lng
    })
    if (noteError) {
        console.error(noteError)
        throw fromCode(noteError.code)
    }
}

export {
    registerMovieNote
}
