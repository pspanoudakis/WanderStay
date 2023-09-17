import { FetchDataResponse } from "../fetchRoutines/fetchAPI";

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

function getEmptyPaginatedResponse<T>(): PaginatedResponse<T> {
    return {
        content: [] as T[],
        size: 0,
        number: 0,
        numberOfElements: 0,
        empty: true,

        totalPages: 0,
        totalElements: 0,

        last: true,
        first: true,
    }
};

export function convertToPaginatedResponse<T>(
    response: FetchDataResponse<unknown>
): FetchDataResponse<PaginatedResponse<T>> {
    return (
        response.ok?
            response as FetchDataResponse<PaginatedResponse<T>>
            :
            {
                content: getEmptyPaginatedResponse<T>(),
                ok: false,
                error: response.error,
                statusCode: response.statusCode,
            }
    );
}
