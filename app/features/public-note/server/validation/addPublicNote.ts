import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    tmdbId: zfd
        .text(z.string().min(1, { message: "tmdbId-validation-error" })),
    note: zfd
        .text(),
    summary: zfd
        .text(),
    public: zfd.checkbox({ trueValue: 'true' })
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