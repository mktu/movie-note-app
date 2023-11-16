import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    id: zfd.text(z.string()),
    name: zfd
        .text(z.string()),
    template: zfd
        .text(z.string()),
    html: zfd
        .text(z.string()),
})

export const updateTemplateSchema = schema

export const parseUpdateTemplate = (formData: FormData) => {
    try {
        return updateTemplateSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type UpdateTemplate = z.infer<typeof schema>;