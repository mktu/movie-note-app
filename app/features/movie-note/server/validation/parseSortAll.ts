import { z } from "zod";
import type { ZodError } from "zod";

const schema = z.object({
    sortType: z.string()
})

export const sortAllSchema = schema

export const parseSortAll = (obj: any) => {
    try {
        return sortAllSchema.parse(obj)
    } catch (e) {
        console.error(e)
        throw Error((e as ZodError).errors[0].message)
    }
}