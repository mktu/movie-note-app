import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    noteId: zfd
        .text(z.string().min(1, { message: "tmdbId-validation-error" }))
})

export const deleteNoteSchema = schema

export const parseDeleteNote = (formData: FormData) => {
    try {
        return deleteNoteSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type DeleteMovieNote = z.infer<typeof schema>;