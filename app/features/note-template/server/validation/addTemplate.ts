import { zfd } from "zod-form-data";
import { z } from "zod";
import type { ZodError } from "zod";

const schema = zfd.formData({
    name: zfd
        .text(z.string()),
    template: zfd
        .text(z.string()),
    html: zfd
        .text(z.string()),
})

export const addTemplateSchema = schema

export const parseAddTemplate = (formData: FormData) => {
    try {
        return addTemplateSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type AddTemplate = z.infer<typeof schema>;