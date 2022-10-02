import Performance from '~/components/develop/performance';
import { GeneralError } from '~/components/error';
import { EditMovieNote } from '~/features/movie-note/';
import { action } from '~/features/movie-note/server/actions/note.server';
import { loader } from '~/features/movie-note/server/loaders/note.server';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { HeadersFunction } from "@remix-run/cloudflare";
import type { FC } from "react";

// stale-while-revalidateの設定
export const headers: HeadersFunction = ({ loaderHeaders }) => {
    const cacheControl =
        loaderHeaders.get('Cache-Control') ??
        's-maxage=86400, stale-while-revalidate=3600';
    // 1day
    return {
        'Cache-Control': cacheControl,
    };
};

export {
    loader,
    action
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
                    imdbRate={content.imdbRate}
                    tmdbCredits={content.tmdbCredits}
                    onSubmit={(updateMovieNote) => {
                        submit(getFormData(updateMovieNote), { method: 'post' })
                    }} error={actionData?.error} />
            </>
        )}
    </>)
}

export default Note