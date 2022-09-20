import Performance from '~/components/develop/performance';
import { GeneralError } from '~/components/error';
import authenticator from '~/features/auth/server/auth.server';
import { EditMovieNote } from '~/features/movie-note/';
import { loadMovieNote, registerMovieNote, updateMovieNote } from '~/features/movie-note/server/db';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { parseAddNote } from '~/features/movie-note/server/validation';
import { MovieNoteError } from '~/features/movie-note/utils/error';
import Tmdb, { setTmdbData } from '~/features/movie-note/utils/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';
import { PerformanceCounter } from '@utils/performance';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';
import { getSupabaseAdmin } from '@utils/server/db/index.server';

import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { ActionArgs, LoaderArgs, HeadersFunction } from "@remix-run/cloudflare";
import type { FC } from "react";
import type { MovieNoteDetail } from "@type-defs/backend";
import type { Credits, TmdbDetail } from '~/features/movie-note/utils/tmdb';
import { parseUpdateNote } from '~/features/movie-note/server/validation/updateNote';

type ActionData = {
    error?: string
}

type ContentData = {
    movieNoteDetail: MovieNoteDetail,
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
    performanceData: { [k: string]: number }
}

type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}
// TODO update
export async function action({ request, context }: ActionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseUpdateNote(await request.formData())
        await updateMovieNote(supabaseAdmin, data, user.id)
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
    // 1day
    return {
        'Cache-Control': cacheControl,
    };
};

export async function loader({ request, context, params }: LoaderArgs) {
    const user = await authenticator.isAuthenticated(request)
    const noteId = params.noteId;
    if (!user) {
        return redirect('/login')
    }
    // But this case never happens. Because if there is no noteId, 
    // it is treated as a different route and will result in a 404 error.
    if (!noteId) {
        return json<LorderData>({ error: 'movie-note-not-found' })
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
    const t3 = counter.start('tmdbCredits')
    const t2_3 = counter.start('tmdb Detail-Credits')

    const getTmdbDetail_ = async () => {
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(context.TmdbInfo as KVNamespace, note.tmdb_id, tmdb.lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(note.tmdb_id)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(context.TmdbInfo as KVNamespace, tmdbDetail)
        }
        t2.comment(`disableKv=${disableKv},hit=${Boolean(tmdbDetailKv)}`)
        t2.stop()
        return tmdbDetail
    }

    const getTmdbCredits_ = async () => {
        const credits = await tmdb.getCredits(note.tmdb_id)
        t3.stop()
        return credits
    }

    // const getImdbRate_ = async ()=>{
    //     const cache = await getImdbRateKv(context.ImdbInfo as KVNamespace, note.)
    // }

    const [tmdbDetail, tmdbCredits] = await Promise.all([getTmdbDetail_(), getTmdbCredits_()])

    t2.finish()
    t3.finish()
    t2_3.finish()

    return json<LorderData>({
        content: {
            movieNoteDetail: note,
            tmdbDetail,
            tmdbCredits,
            performanceData: counter.getResults()
        }
    })
}

const Note: FC = () => {
    const submit = useSubmit()
    const actionData = useActionData<typeof action>()
    const loaderData = useLoaderData<typeof loader>()
    const content = loaderData.content

    return (<>
        {loaderData.error && (
            <GeneralError key={loaderData.error} />
        )}
        {content && (
            <>
                <Performance counters={content.performanceData} />
                <EditMovieNote
                    key={content.movieNoteDetail.tmdb_id || ''}
                    movieNoteDetail={content.movieNoteDetail}
                    tmdbDetail={content.tmdbDetail}
                    tmdbCredits={content.tmdbCredits}
                    onSubmit={(updateMovieNote) => {
                        submit(getFormData(updateMovieNote), { method: 'post' })
                    }} error={actionData?.error} />
            </>
        )}
    </>)
}

export default Note