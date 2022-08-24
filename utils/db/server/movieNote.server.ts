import type { AddMovieNote, MovieNoteTable } from '@type-defs/backend';
import type { AdminClientType } from '../../supabaseAdmin.server'

const registerMovieNote = async (supabaseAdmin: AdminClientType, movieNote: AddMovieNote) => {
    const { error } = await supabaseAdmin.from<MovieNoteTable>('movie_note').insert({
        tmdb_id: movieNote.tmdbId,
        memo: movieNote.movieMemo,
        user_id: movieNote.userId
    })
    // const { error } = await supabaseAdmin.rpc('add_movie_note', {
    //     id: uuid,
    //     title: movieNote.title,
    //     tmdb_id: movieNote.tmdbId,
    //     memo: movieNote.movieMemo
    // })
    if (error) {
        console.error(error)
        throw Error('failed to register')
    }
}

export {
    registerMovieNote
}
