import { parseISO } from 'date-fns'

export const parseISODateString = (dateStr: string) => {
    return parseISO(dateStr)
}
