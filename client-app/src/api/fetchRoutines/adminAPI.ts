import { UserSearchRequest } from "../requests/UserSearchRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { UserResponse } from "../responses/UserResponse";
import { UserSearchResult } from "../responses/UserSearchResult";
import { FetchDataHttpMethod, FetchDataResponse, SupportedAcceptType, createEndPointUrl, fetchData } from "./fetchAPI";

type AdminAPIDataExportRequest = {
    controllerRelativeEndpoint: string,
    acceptType: SupportedAcceptType
}

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

async function sendAdminAPIExportDataRequest(request: AdminAPIDataExportRequest) {
    return await sendAdminAPIRequest<any>({
        method: 'GET',
        ...request,
    })
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

export async function exportAllGuestReviews(username: string, acceptType: SupportedAcceptType) {
    return await sendAdminAPIExportDataRequest({
        controllerRelativeEndpoint: `guest/${username}/reviews`,
        acceptType
    })
}

export async function exportAllGuestReservations(username: string, acceptType: SupportedAcceptType) {
    return await sendAdminAPIExportDataRequest({
        controllerRelativeEndpoint: `guest/${username}/reservations`,
        acceptType
    })
}

export async function exportAllHostProperties(username: string, acceptType: SupportedAcceptType) {
    return await sendAdminAPIExportDataRequest({
        controllerRelativeEndpoint: `host/${username}/properties`,
        acceptType
    })
}

export async function exportAllHostReviews(username: string, acceptType: SupportedAcceptType) {
    return await sendAdminAPIExportDataRequest({
        controllerRelativeEndpoint: `host/${username}/reviews`,
        acceptType
    })
}

export async function searchUsers(request: UserSearchRequest) {
    const response = await sendAdminAPIRequest<unknown>({
        controllerRelativeEndpoint: (
            'searchUsers?' + [
                ...Object.entries(request.searchCriteria).reduce(
                    (acc, [k, v]) => {
                        if (v !== null) acc.push(`${k}=${v}`);
                        return acc;
                    },
                    [] as string[]
                ),
                `numPage=${request.paginationInfo.pageNum}`,
                `pageSize=${request.paginationInfo.pageSize}`
            ].join('&')
        ),
        method: 'GET'
    });
    return convertToPaginatedResponse<UserSearchResult>(response);
}
