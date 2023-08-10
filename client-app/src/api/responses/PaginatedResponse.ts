export type PaginatedResponse<T> = {
    content: T[],
    size: number,
    number: number,
    numberOfElements: number,
    empty: boolean,

    totalPages: number,
    totalElements: number,

    last: boolean,
    first: boolean,
}

export const emptyPaginatedResponse: PaginatedResponse<unknown> = {
    content: [],
    size: 0,
    number: 0,
    numberOfElements: 0,
    empty: true,

    totalPages: 0,
    totalElements: 0,

    last: true,
    first: true,
};
