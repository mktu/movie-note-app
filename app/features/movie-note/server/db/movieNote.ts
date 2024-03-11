import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { AddMovieNote, FilterType, SortType } from '../types'
import { MovieNoteError, fromCode } from '../../utils/error';
import type { UnboxReturnedPromise } from '~/types/utils';

const registerMovieNote = async (supabaseAdmin: AdminClientType, movieNote: AddMovieNote, userId: string) => {

    const { data } = await supabaseAdmin.from('movie_info').select('tmdb_id').eq('tmdb_id', movieNote.tmdbId)
    if (!data || data.length === 0) {
        const { error: infoError } = await supabaseAdmin.from('movie_info').insert({
            tmdb_id: movieNote.tmdbId,
            title: movieNote.title,
            thumbnail: movieNote.thumbnail,
            lng: movieNote.lng,
            imdb_id: movieNote.imdbId
        })
        if (infoError) {
            console.error(infoError)
            throw fromCode(infoError.code)
        }
    }
    const { error: noteError } = await supabaseAdmin.from('movie_note').insert({
        tmdb_id: movieNote.tmdbId,
        memo: movieNote.movieMemo,
        user_id: userId,
        admiration_date: movieNote.admirationDate || null,
        stars: movieNote.stars,
        lng: movieNote.lng,
        watch_state: movieNote.watchState
    })
    if (noteError) {
        console.error(noteError)
        throw fromCode(noteError.code)
    }
}

const updateMovieNote = async (supabaseAdmin: AdminClientType, movieNote: AddMovieNote, userId: string) => {
    const { error: infoError } = await supabaseAdmin.from('movie_info').update({
        title: movieNote.title,
        thumbnail: movieNote.thumbnail,
        imdb_id: movieNote.imdbId
    }).match({
        tmdb_id: movieNote.tmdbId,
        lng: movieNote.lng,
    })
    if (infoError) {
        console.error(infoError)
        throw fromCode(infoError.code)
    }
    const { error: noteError } = await supabaseAdmin.from('movie_note').update({
        memo: movieNote.movieMemo,
        user_id: userId,
        admiration_date: movieNote.admirationDate || null,
        stars: movieNote.stars,
        watch_state: movieNote.watchState || null,
        published: movieNote.published,
        html: movieNote.html || null
    }).match({
        tmdb_id: movieNote.tmdbId,
        user_id: userId,
        lng: movieNote.lng
    })
    if (noteError) {
        console.error(noteError)
        throw fromCode(noteError.code)
    }
}

const deleteNote = async (supabaseAdmin: AdminClientType, tmdbId: string, userId: string) => {
    const { error: noteError } = await supabaseAdmin.from('movie_note').delete().match({
        tmdb_id: tmdbId,
        user_id: userId
    })
    if (noteError) {
        console.error(noteError)
        throw fromCode(noteError.code)
    }
}

const sortMovieNoteList = async (supabaseAdmin: AdminClientType, userId: string, sortType: SortType) => {
    const asc = sortType?.includes('asc') ? true : false
    const query = supabaseAdmin.from('movie_note')
        .select('tmdb_id,user_id,sort_index, lng')
        .eq('user_id', userId)
    const { data, error } = await query.order('sort_index', { ascending: asc })
    if (error) {
        console.error(error)
        throw fromCode(error.code)
    }
    const updated = data?.map((v, idx) => ({
        ...v,
        sort_index: idx,
    }))
    if (!updated || updated.length === 0) {
        return
    }
    const { error: upsertError } = await supabaseAdmin.from('movie_note').upsert(updated)
    if (upsertError) {
        console.error(upsertError)
        throw fromCode(upsertError.code)
    }
}

const listMovieNote = async (supabaseAdmin: AdminClientType, userId: string, filterType?: FilterType) => {
    const query = supabaseAdmin.from('movie_note_list_view')
        .select('tmdb_id,user_id,stars,title,admiration_date,thumbnail,watch_state, sort_index')
        .eq('user_id', userId)
    if (filterType && filterType !== 'all') {
        query.eq('watch_state', filterType)
    }
    const { data, error } = await query.order('sort_index')
    if (error) {
        console.error(error)
        throw fromCode(error.code)
    }
    if (!data) {
        return []
    }
    type DataType = typeof data
    type SingleDataType = DataType[0]
    type Requires = { tmdb_id: string, user_id: string }
    type Optionals = Omit<SingleDataType, 'tmdb_id' | 'user_id'>
    type Merged = Requires & Optionals
    return data! as Merged[]
}

const loadMovieNoteIfExists = async (supabaseAdmin: AdminClientType, userId: string, tmdbId: string) => {
    const { data, error } = await supabaseAdmin.from('movie_note_list_view')
        .select('*').eq('user_id', userId).eq('tmdb_id', tmdbId).limit(1)
    if (error) {
        console.error(error)
        throw fromCode(error.code)
    }
    if (!data || data.length === 0) {
        return null
    }
    return data![0]
}

const loadMovieNote = async (supabaseAdmin: AdminClientType, userId: string, tmdbId: string) => {
    const ret = await loadMovieNoteIfExists(supabaseAdmin, userId, tmdbId)
    if (ret === null) {
        throw new MovieNoteError('movie-note-not-found')
    }
    return ret
}

export type MovieListType = UnboxReturnedPromise<typeof listMovieNote>
export type MovieListItemType = MovieListType[0]
export type MovieNoteType = UnboxReturnedPromise<typeof loadMovieNote>

export {
    registerMovieNote,
    updateMovieNote,
    listMovieNote,
    loadMovieNote,
    loadMovieNoteIfExists,
    deleteNote,
    sortMovieNoteList
}
