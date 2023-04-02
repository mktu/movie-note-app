import { z } from "zod";
import type { ZodError } from "zod";

const schema = z.object({
    key: z.string(),
    value: z.string()
})

export const userSettingSchema = schema

export const parseUserSettings = (obj: any) => {
    try {
        return userSettingSchema.parse(obj)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}