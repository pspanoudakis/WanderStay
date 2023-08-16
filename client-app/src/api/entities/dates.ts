export type OptionalDate = Date | null | undefined

export function compareDates(d1: OptionalDate, d2: OptionalDate) {
    return Number(d2?.getTime()) - Number(d1?.getTime());
}

export function compareDatesStr(d1: string | null, d2: string | null) {
    return d2?.localeCompare(d1 ?? '') ?? (- Number(Boolean(d1)))
}

export function dateToStr(d: OptionalDate) {
    if (d) {
        return [
            d.getFullYear().toString(),
            ('0' + (d.getMonth() + 1)).slice(-2),
            ('0' + (d.getDate())).slice(-2)
        ].join('-');
    }
    return null
}
