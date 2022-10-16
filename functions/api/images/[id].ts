
export const onRequestGet: PagesFunction<{
    MovieNoteApp: R2Bucket
}> = async ({ env, params }) => {
    const { id } = params as { id: string }
    const image = await env.MovieNoteApp.get(id)
    if (!image) {
        return new Response(`key:${id} is not found`, {
            status: 404
        })
    }
    // ...
    return new Response(await image.blob(), {
        status: 200,
        headers: {
            'Content-Type': image.httpMetadata?.contentType || '',
        }
    });
}