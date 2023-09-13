import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";
import { PropertyReservationResult } from "../responses/PropertyReservationResults";
import { PropertyHostSidePreview } from "../responses/PropertyHostSidePreview";

async function sendHostAPIRequest<T>(controllerRelativeEndpoint: string) {
    return await fetchData({
        endpoint: createEndPointUrl(`/host/${controllerRelativeEndpoint}`),
        method: "GET",
        useJwt: true
    }) as FetchDataResponse<T>;
}

export async function fetchHostProperties(pageNum: number, pageSize: number) {
    return convertToPaginatedResponse<PropertyHostSidePreview>(
        await sendHostAPIRequest(
            `properties?numPage=${pageNum}&pageSize=${pageSize}`
        )
    )
}

export async function fetchHostReservations(pageNum: number, pageSize: number) {
    return convertToPaginatedResponse<PropertyReservationResult>(
        await sendHostAPIRequest(
            `reservations?numPage=${pageNum}&pageSize=${pageSize}`
        )
    );
}

export async function fetchUpcomingHostReservations(pageNum: number, pageSize: number) {
    return convertToPaginatedResponse<PropertyReservationResult>(
        await sendHostAPIRequest(
            `upcomingReservations?numPage=${pageNum}&pageSize=${pageSize}`
        )
    );
}
