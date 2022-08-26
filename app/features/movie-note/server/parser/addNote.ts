import type { AddMovieNote } from "@type-defs/backend"

const parser = async (request: Request, userId: string) => {

    const formData = await request.formData()
    const tmdbId = formData.get("tmdbId") as string || ''
    const movieMemo = formData.get("movieMemo") as string || ''

    return {
        tmdbId,
        movieMemo,
        userId
    } as AddMovieNote
}

export default parser