export type OptionalDate = Date | null | undefined

export function compareDates(d1: OptionalDate, d2: OptionalDate) {
    return Number(d2?.getTime()) - Number(d1?.getTime());
}

export function dateToStr(d: OptionalDate) {
    return d?.toJSON().slice(0, 10);
}
