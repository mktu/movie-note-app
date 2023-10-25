import Performance from '~/components/develop/performance';
import { useLoaderData } from "@remix-run/react";
import { loader } from '~/features/movie-note/server/loaders/actor.server';
import type { FC } from "react";
import { GeneralError } from "~/components/error";
import Settings from '~/features/movie-note/components/performance/Settings';
import { Actor } from '~/features/movie';

export {
    loader,
}

const ActorRoute: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
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
                <Actor
                    actor={content.actor}
                    movieCredits={content.movieCredits}
                />
            </>
        )}
    </>)
}

export default ActorRoute;