import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    tmdbId: zfd
        .text(z.string().min(1, { message: "tmdbId-validation-error" })),
    note: zfd
        .text(),
    summary: zfd
        .text(z.string().optional()),
    public: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
    coverImageFile: zfd.file().optional(),
    coverImage: zfd.text().optional(),
    useDefaultTopImage: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
})

export const addPublicNoteSchema = schema

export const parseAddPublicNote = (formData: FormData) => {
    try {
        return addPublicNoteSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type AddPublicNote = z.infer<typeof schema>;