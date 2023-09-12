import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";
import { PropertyReservationResult } from "../responses/PropertyReservationResults";

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
            `reservations?numPage=${pageNum}&pageSize=${pageSize}`
        )
    );
}
