export type PaginatedResponse<T> = {
    content: T[],
    size: number,
    number: number,
    numberOfElements: number,
    empty: boolean

    totalPages: number,
    totalElements: number,

    last: boolean,
    first: boolean,
}
