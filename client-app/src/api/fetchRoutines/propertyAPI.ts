import { GetPropertyReviewsRequest } from "../requests/GetPropertyReviewsRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { createEndPointUrl, fetchData } from "./fetchAPI";

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
