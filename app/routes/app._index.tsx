import { useLoaderData } from "@remix-run/react";
import { MovieNoteDashboard } from "~/features/movie-note/pages";
import { loader } from '~/features/movie-note/server/loaders/dashboard.server'
import Performance from '~/components/develop/performance';
import Settings from "~/features/movie-note/components/performance/Settings";

export { loader }
export default function Index() {
    const loaderData = useLoaderData<typeof loader>()
    return (
        <>
            <Performance counters={loaderData.performanceData}
                customSetting={<Settings />}
            />
            <MovieNoteDashboard trends={loaderData.trends} />
        </>
    );
}
