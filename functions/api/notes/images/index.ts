import { json, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/cloudflare"
import { v4 as uuidv4 } from 'uuid';

export const onRequestPut: PagesFunction<{
    MovieNoteImage: R2Bucket
}> = async ({ env, request }) => {
    const uploadHandler = unstable_createMemoryUploadHandler({
        maxPartSize: 500_000,
    });
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );
    const file = formData.get('image') as Blob
    const uuid = uuidv4()
    const image = await env.MovieNoteImage.put(uuid, await file.arrayBuffer(), {
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