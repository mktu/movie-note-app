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
    title: zfd
        .text(z.string().min(1, { message: "title-validation-error" })),
    lng: zfd
        .text(z.string().min(1, { message: "lng-validation-error" })),
})

export const addNoteSchema = schema

export const parseAddNote = (formData: FormData) => {
    try {
        return addNoteSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type AddMovieNote = z.infer<typeof schema>;