import type { AddMovieNote } from "@type-defs/backend"

const parser = async (request: Request, userId: string) => {

    const formData = await request.formData()
    const tmdbId = formData.get("tmdbId") as string || ''
    const movieMemo = formData.get("movieMemo") as string || ''
    const admirationDate = formData.get("admirationDate") as string || ''
    const stars = formData.get("stars") as string || ''
    const thumbnail = formData.get("thumbnail") as string || ''
    const title = formData.get("title") as string || ''
    const lng = formData.get("lng") as string || ''
    return {
        tmdbId,
        movieMemo,
        userId,
        admirationDate,
        stars: Number(stars),
        thumbnail,
        title,
        lng
    } as AddMovieNote
}

export default parser