import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    tmdbId: zfd
        .text(z.string().min(1, { message: "tmdbId-validation-error" })),
    published: zfd
        .text(z.string().optional()),
    html: zfd
        .text(z.string().optional())
})

export const publishSchema = schema

export const parsePublishNote = (formData: FormData) => {
    try {
        return publishSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type PublishNote = z.infer<typeof schema>;