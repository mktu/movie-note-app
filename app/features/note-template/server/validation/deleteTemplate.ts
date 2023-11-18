import { zfd } from "zod-form-data";
import type { ZodError, z } from "zod";

const schema = zfd.formData({
    templateId: zfd.numeric(),
    redirectTo: zfd.text(),
})

export const deleteTemplateSchema = schema

export const parseDeleteTemplate = (formData: FormData) => {
    try {
        return deleteTemplateSchema.parse(formData)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}

export type DeleteTemplateNote = z.infer<typeof schema>;