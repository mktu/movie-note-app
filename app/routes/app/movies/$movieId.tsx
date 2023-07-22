import Performance from '~/components/develop/performance';
import { GeneralError } from '~/components/error';
import Settings from '~/features/movie-note/components/performance/Settings';
import { loader } from '~/features/movie-note/server/loaders/movie.server';
import { action } from '~/features/movie-note/server/actions/movie.server';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { FC } from "react";
import { Movie } from '~/features/movie/pages';
export {
    loader,
    action
}

const Note: FC = () => {
    const submit = useSubmit()
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const content = loaderData.content

    return (<>
        {loaderData.error && (
            <GeneralError key={loaderData.error} />
        )}
        {content && (
            <>
                <Performance counters={content.performanceData}
                    customSetting={<Settings />}
                />
                <Movie
                    tmdbDetail={content.tmdbDetail}
                    tmdbCredits={content.tmdbCredits}
                    error={actionData?.error}
                    onSubmit={(updateMovieNote) => {
                        submit(getFormData(updateMovieNote), { method: 'post' })
                    }} />
            </>
        )}
    </>)
}

export default Note