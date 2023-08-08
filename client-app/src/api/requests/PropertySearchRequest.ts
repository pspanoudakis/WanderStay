import { PropertySearchCriteria } from "../entities/searchPropertiesCriteria";
import { PaginationRequest } from "./PaginationRequest";

export interface PropertySearchRequest {
    paginationInfo: PaginationRequest,
    filtersInfo: PropertySearchCriteria,
};
