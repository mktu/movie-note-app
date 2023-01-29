export const onRequestGet: PagesFunction<{
    MovieNoteImage: R2Bucket
}> = async ({ env, params }) => {
    const { id } = params as { id: string }
    const image = await env.MovieNoteImage.get(id)
    if (!image) {
        return new Response(`key:${id} is not found`, {
            status: 404
        })
    }
    return new Response(await image.blob(), {
        status: 200,
        headers: {
            'Content-Type': image.httpMetadata?.contentType || '',
            'Content-Length': '' + image.size
        }
    });
}