export const onRequestGet: PagesFunction<{
    IMDB_SCRAPER_URL: string
}> = async ({ params, env }) => {
    const url = env.IMDB_SCRAPER_URL
    const { id } = params as { id: string }
    return await fetch(`${url}/${id}`)
}