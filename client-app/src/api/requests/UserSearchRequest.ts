import { UserSearchCriteria } from "../entities/UserSearchCriteria";
import { PaginationRequest } from "./PaginationRequest";

export interface UserSearchRequest {
    paginationInfo: PaginationRequest,
    searchCriteria: UserSearchCriteria,
};
