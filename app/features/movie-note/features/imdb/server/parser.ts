import { ScrapeError } from "./exception"

export const parseRating = (text: string) => {
    const matcher = /(\d+\.?\d*)\/(\d{2})(\d+\.?\d*[A-Z]?)/gm
    const values = matcher.exec(text)
    if (!values || values?.length !== 4) {
        throw new ScrapeError('regex parse error', 500)
    }
    return {
        rate: values[1],
        denominator: values[2],
        parameter: values[3]
    }
}