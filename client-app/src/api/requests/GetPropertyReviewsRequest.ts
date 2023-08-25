import { PaginationRequest } from "./PaginationRequest";

export interface GetPropertyReviewsRequest {
    paginationInfo: PaginationRequest,
    propertyId: number,
};
