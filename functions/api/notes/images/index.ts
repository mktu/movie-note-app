import { json } from "@remix-run/cloudflare"
import { v4 as uuidv4 } from 'uuid';

export const onRequestPut: PagesFunction<{
    MovieNoteImage: R2Bucket
}> = async ({ env, request }) => {
    const file = (await request.formData()).get('image') as Blob
    console.log(file)
    const uuid = uuidv4()
    const image = await env.MovieNoteImage.put(uuid, file, {
        httpMetadata: {
            contentType: file.type
        }
    })
    if (!image) {
        return new Response(`Failed to save image`, {
            status: 500
        })
    }
    return json({
        path: `/api/notes/images/${uuid}`
    })
}