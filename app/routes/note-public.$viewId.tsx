import { GeneralError } from '~/components/error';
import { PublicNote } from '~/features/public-note/pages';
import { loader } from '~/features/public-note/server/loaders/public-note.server';

import { useLoaderData } from '@remix-run/react';

import type { FC } from 'react';
export {
    loader
}

const PublicNotePage: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content?.tmdbDetail.id && loaderData.content.publicNote && (
                <PublicNote
                    publicNote={{
                        ...loaderData.content.publicNote,
                        tmdbId: loaderData.content.publicNote.tmdb_id,
                        createdAt: loaderData.content.publicNote.created_at,
                        updatedAt: loaderData.content.publicNote.updated_at,
                        userId: loaderData.content.publicNote.user_id,
                        viewId: loaderData.content.publicNote.view_id
                    }}
                    tmdbDetail={loaderData.content?.tmdbDetail}
                />
            )}
        </>

    )
}

export default PublicNotePage 