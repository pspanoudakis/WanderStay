import { UserDetailsRequest } from "../requests/UserDetailsRequest";
import { UserResponse } from "../responses/UserResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

export async function updateUserDetails(request: UserDetailsRequest) {
    return await fetchData({
        endpoint: createEndPointUrl('/user/editProfile'),
        method: 'POST',
        body: request,
        useJwt: true,
    }) as FetchDataResponse<UserResponse>;
}
