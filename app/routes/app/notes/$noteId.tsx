import authenticator from '~/features/auth/server/auth.server';
import { EditMovieNote } from '~/features/movie-note/';
import { loadMovieNote, registerMovieNote } from '~/features/movie-note/server/db';
import { parseAddNote } from '~/features/movie-note/server/validation';
import { MovieNoteError } from '~/features/movie-note/utils/error';
import Tmdb, { setTmdbData } from '~/features/movie-note/utils/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';
import { getSupabaseAdmin } from '@utils/server/db/index.server';

import type { ActionArgs, LoaderArgs, HeadersFunction } from "@remix-run/cloudflare";
import type { FC } from "react";
import type { MovieNoteDetail } from "@type-defs/backend";
import type { Credits, TmdbDetail } from '~/features/movie-note/utils/tmdb';
import { getTmdbKv, putTmdbInfo } from '~/features/movie-note/server/kv';
import { PerformanceCounter } from '@utils/performance';
import Performance from '~/components/develop/performance'
import { getSearchParamAsBoolean } from '@utils/searchparam.server';

type ActionData = {
    error?: string
}

type LorderData = {
    movieDetail: MovieNoteDetail,
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
    performanceData: { [k: string]: number }
}
// TODO update
export async function action({ request, context }: ActionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login') // TODO fix it!
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddNote(await request.formData())
        await registerMovieNote(supabaseAdmin, data, user.id)
        return redirect('/app')
    } catch (e) {
        if (e instanceof MovieNoteError) {
            return json<ActionData>({
                error: e.message
            }, { status: e.status })
        }
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};

// stale-while-revalidateの設定
export const headers: HeadersFunction = ({ loaderHeaders }) => {
    const cacheControl =
        loaderHeaders.get('Cache-Control') ??
        'max-age=0, s-maxage=86400, stale-while-revalidate=3600';
    return {
        'Cache-Control': cacheControl,
    };
};

export async function loader({ request, context, params }: LoaderArgs) {
    const user = await authenticator.isAuthenticated(request)
    const noteId = params.noteId;
    if (!user || !noteId) {
        return redirect('/login') // TODO fix it!
    }
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')

    const dbAdmin = getSupabaseAdmin(context)
    const counter = new PerformanceCounter()

    const t1 = counter.start('loadMovieNote')
    const note = await loadMovieNote(dbAdmin, user.id, noteId)
    const lng = note.lng === 'ja' ? 'ja' : 'en'
    t1.finish()

    const tmdbData = setTmdbData(context)
    const tmdb = new Tmdb(tmdbData.apiKey, lng)

    const t2 = counter.start('tmdbDetail')
    const tmdbDetailKv = disableKv ? null : await getTmdbKv(context.TmdbInfo as KVNamespace, note.tmdb_id, lng)
    const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(note.tmdb_id)
    t2.finish(`kv=${Boolean(tmdbDetailKv)}`)

    const t3 = counter.start('tmdbDetail')
    const tmdbCredits = await tmdb.getCredits(note.tmdb_id)
    if (!tmdbDetailKv) {
        await putTmdbInfo(context.TmdbInfo as KVNamespace, tmdbDetail)
    }
    t3.finish()

    return json<LorderData>({
        movieDetail: note,
        tmdbDetail,
        tmdbCredits,
        performanceData: counter.getResults()
    })
}

const Note: FC = () => {
    const submit = useSubmit()
    const actionData = useActionData<typeof action>()
    const loaderData = useLoaderData<typeof loader>()
    return (<>
        <Performance counters={loaderData.performanceData} />
        <EditMovieNote
            key={loaderData.movieDetail.tmdb_id || ''}
            movieNoteDetail={loaderData.movieDetail}
            tmdbDetail={loaderData.tmdbDetail}
            tmdbCredits={loaderData.tmdbCredits}
            onSubmit={(addMovieNote) => {
                submit(getFormData(addMovieNote), { method: 'post' })
            }} error={actionData?.error} />
    </>)
}

export default Note