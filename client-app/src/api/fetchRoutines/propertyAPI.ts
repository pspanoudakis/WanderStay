import { GetPropertyReviewsRequest } from "../requests/GetPropertyReviewsRequest";
import { PaginatedResponse } from "../responses/PaginatedResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

export async function fetchPropertyReviews(request: GetPropertyReviewsRequest) {
    return await fetchData({
        endpoint: createEndPointUrl(
            `/property/${request.propertyId}/reviews?` + 
            `numPage=${request.paginationInfo.pageNum}&` + 
            `pageSize=${request.paginationInfo.pageSize}`
        ),
        method: "GET"
    }) as FetchDataResponse<PaginatedResponse<PropertyReviewResult>>;
}
