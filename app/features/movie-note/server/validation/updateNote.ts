import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    tmdbId: zfd
        .text(z.string().min(1, { message: "tmdbId-validation-error" })),
    movieMemo: zfd
        .text(z.string().optional()),
    admirationDate: zfd
        .text(z.string().nullable().optional()),
    stars: zfd
        .numeric(z.number().gte(0, 'stars-validation-error').lte(10, 'stars-validation-error'))
    ,
    thumbnail: zfd
        .text(z.string().optional()),
    imdbId: zfd
        .text(z.string().optional()),
    title: zfd
        .text(z.string().min(1, { message: "title-validation-error" })),
    lng: zfd
        .text(z.string().min(1, { message: "lng-validation-error" })),
    watchState: zfd
        .text(z.string().optional()),
    hasPublicNote: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
    published: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
    html: zfd
        .text(z.string().optional())
})

export const updateNoteSchema = schema

export const parseUpdateNote = (formData: FormData) => {
    try {
        return updateNoteSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type UpdateMovieNote = z.infer<typeof schema>;