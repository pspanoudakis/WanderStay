import { GetPropertyReviewsRequest } from "../requests/GetPropertyReviewsRequest";
import { PropertyReservationRequest } from "../requests/PropertyReservationRequest";
import { PropertyReviewRequest } from "../requests/PropertyReviewRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { PropertyDetails, PropertyDetailsResponse } from "../responses/PropertyDetailsResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

export async function fetchPropertyReviews(request: GetPropertyReviewsRequest) {
    const response = await fetchData({
        endpoint: createEndPointUrl(
            `/property/${request.propertyId}/reviews?` + 
            `numPage=${request.paginationInfo.pageNum}&` + 
            `pageSize=${request.paginationInfo.pageSize}`
        ),
        method: "GET"
    });
    return convertToPaginatedResponse<PropertyReviewResult>(response);
}

export async function submitPropertyReview(request: PropertyReviewRequest){
    return await fetchData({
        endpoint: createEndPointUrl(
            `/property/${request.propertyId}/review`
        ),
        method: "POST",
        body: request,
        useJwt: true
    }) as FetchDataResponse<unknown>;
}

export async function getPropertyDetails(propertyId: number) {
    return await fetchData({
        endpoint: createEndPointUrl(`/property/${propertyId}`),
        method: "GET",
    }) as FetchDataResponse<PropertyDetailsResponse>;
}

export async function makePropertyReservation(propertyId: number, request: PropertyReservationRequest) {
    return await fetchData({
        endpoint: createEndPointUrl(`/property/${propertyId}/reserve`),
        method: "POST",
        useJwt: true,
        body: request
    }) as FetchDataResponse<unknown>;
}

export async function createOrUpdateProperty(propertyDetails: PropertyDetails, propertyId?: number) {
    return await fetchData({
        endpoint: createEndPointUrl(`/property${propertyId ? `/${propertyId}` : '/'}`),
        method: "POST",
        useJwt: true,
        body: {
            ...propertyDetails,
            imageSelections: propertyDetails.images,
            cityId: propertyDetails.city?.id
        },
    }) as FetchDataResponse<PropertyDetailsResponse>;
}
