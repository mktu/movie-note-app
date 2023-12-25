import Performance from '~/components/develop/performance';
import { GeneralError } from '~/components/error';
import { EditMovieNote } from '~/features/movie-note/';
import Settings from '~/features/movie-note/components/performance/Settings';
import { action } from '~/features/movie-note/server/actions/note.server';
import { loader } from '~/features/movie-note/server/loaders/note.server';

import { useActionData, useLoaderData } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { HeadersFunction } from "@remix-run/cloudflare";
import { useCallback, type FC } from "react";
import { useDebounceFetcher } from '~/features/movie-note/hooks/useDebounceFetcher';
import type { AddMovieNote } from '@type-defs/frontend';

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
    const debounceSubmit = useDebounceFetcher()
    const actionData = useActionData<typeof action>()
    const loaderData = useLoaderData<typeof loader>()
    const content = loaderData.content

    const onSubmit = useCallback((updateMovieNote: AddMovieNote, debounceTimeout?: number) => {
        debounceSubmit(getFormData(updateMovieNote), { method: 'post', debounceTimeout })
    }, [debounceSubmit])

    const onPublish = useCallback((previewHtml: string) => {
        debounceSubmit(getFormData({
            previewHtml,
            isPublish: true
        }), { method: 'post' })
    }, [])

    return (<>
        {loaderData.error && (
            <GeneralError key={loaderData.error} />
        )}
        {content && (
            <>
                <Performance counters={content.performanceData}
                    customSetting={<Settings />}
                />
                <EditMovieNote
                    key={content.movieNoteDetail.tmdb_id || ''}
                    onPublish={onPublish}
                    published={content.published}
                    movieNoteDetail={content.movieNoteDetail}
                    tmdbDetail={content.tmdbDetail}
                    tmdbCredits={content.tmdbCredits}
                    onSubmit={onSubmit} error={actionData?.error} />
            </>
        )}
    </>)
}

export default Note