import { zfd } from "zod-form-data";
import type { z, ZodError } from "zod";

const schema = zfd.formData({
    id: zfd.numeric(),
    name: zfd
        .text(),
    template: zfd
        .text(),
    html: zfd
        .text(),
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