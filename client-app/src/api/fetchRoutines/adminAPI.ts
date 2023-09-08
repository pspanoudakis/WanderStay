import { UserSearchRequest } from "../requests/UserSearchRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { UserResponse } from "../responses/UserResponse";
import { UserSearchResult } from "../responses/UserSearchResult";
import { FetchDataHttpMethod, FetchDataResponse, SupportedAcceptType, createEndPointUrl, fetchData } from "./fetchAPI";

type AdminAPIRequest = {
    controllerRelativeEndpoint: string,
    method: FetchDataHttpMethod,
    acceptType?: SupportedAcceptType
}

async function sendAdminAPIRequest<T>(request: AdminAPIRequest) {
    return await fetchData({
        endpoint: createEndPointUrl(`/admin/${request.controllerRelativeEndpoint}`),
        method: request.method,
        useJwt: true,
        acceptType: request.acceptType,
    }) as FetchDataResponse<T>;
}

export async function getUserProfile(username: String) {
    return await sendAdminAPIRequest<UserResponse>({
        controllerRelativeEndpoint: `user/${username}`,
        method: 'GET'
    });
}

export async function setUserIsActive(username: string, isActive: boolean) {
    return await sendAdminAPIRequest<UserResponse>({
        controllerRelativeEndpoint: `user/${username}/setActive?isActive=${isActive}`,
        method: 'POST'
    });
}

export async function searchUsers(request: UserSearchRequest) {
    const response = await sendAdminAPIRequest<unknown>({
        controllerRelativeEndpoint: (
            'searchUsers?' +
            Object.entries(request.searchCriteria).map(
                ([k, v]) => `${k}=${v ?? 'null'}`
            ).join('&') +
            `numPage=${request.paginationInfo.pageNum}&` +
            `pageSize=${request.paginationInfo.pageSize}`
        ),
        method: 'GET'
    });
    return convertToPaginatedResponse<UserSearchResult>(response);
}
