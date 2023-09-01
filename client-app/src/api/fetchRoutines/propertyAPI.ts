import { GetPropertyReviewsRequest } from "../requests/GetPropertyReviewsRequest";
import { PropertyReviewRequest } from "../requests/PropertyReviewRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { PropertyDetailsResponse } from "../responses/PropertyDetailsResponse";
import { PropertyReviewResponse } from "../responses/PropertyReviewResponse";
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
    }) as FetchDataResponse<PropertyReviewResponse>;
}

export async function getPropertyDetails(propertyId: number) {
    return await fetchData({
        endpoint: createEndPointUrl(`/property/${propertyId}`),
        method: "GET",
    }) as FetchDataResponse<PropertyDetailsResponse>;
}
