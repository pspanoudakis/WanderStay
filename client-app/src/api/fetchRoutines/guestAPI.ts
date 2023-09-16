import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";
import { PropertyReservationResult } from "../responses/PropertyReservationResults";
import { paginationQueryParamString } from "./fetchUtils";

async function sendGuestAPIRequest<T>(controllerRelativeEndpoint: string) {
    return await fetchData({
        endpoint: createEndPointUrl(`/guest/${controllerRelativeEndpoint}`),
        method: "GET",
        useJwt: true
    }) as FetchDataResponse<T>;
}

export async function fetchGuestReservations(pageNum: number, pageSize: number) {
    return convertToPaginatedResponse<PropertyReservationResult>(
        await sendGuestAPIRequest(
            `reservations?${paginationQueryParamString(pageNum, pageSize)}`
        )
    );
}

export async function fetchUpcomingGuestReservations(pageNum: number, pageSize: number) {
    return convertToPaginatedResponse<PropertyReservationResult>(
        await sendGuestAPIRequest(
            `upcomingReservations?${paginationQueryParamString(pageNum, pageSize)}`
        )
    );
}
