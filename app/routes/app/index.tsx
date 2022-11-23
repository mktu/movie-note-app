import { useLoaderData } from "@remix-run/react";
import { MovieNoteDashboard } from "~/features/movie-note/pages";
import { loader } from '~/features/movie-note/server/loaders/dashboard.server'
export { loader }

export default function Index() {
    const loaderData = useLoaderData<typeof loader>()
    return (
        <MovieNoteDashboard trends={loaderData.trends} />
    );
}
