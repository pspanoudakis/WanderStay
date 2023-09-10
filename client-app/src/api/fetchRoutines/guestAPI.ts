import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { createEndPointUrl, fetchData } from "./fetchAPI";
import { PropertyReservationResult } from "../responses/PropertyReservationResults";

export async function fetchReservationResults(pageNum: number, pageSize: number) {
    const response = await fetchData({
        endpoint: createEndPointUrl(""),
        method: "GET",
        useJwt: true
    });
    return convertToPaginatedResponse<PropertyReservationResult>(response);
}
