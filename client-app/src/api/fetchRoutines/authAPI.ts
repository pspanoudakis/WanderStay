import { updateJwt } from "../jwt/jwt";
import { RegisterUserRequest, AuthRequest } from "../requests/authRequests";
import { UserResponse } from "../responses/UserResponse";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

function authPreReturnHandler(renewJwt: boolean) {
    return (response: FetchDataResponse<unknown>) => {
        if (response.ok && renewJwt && response.jwt) {
            updateJwt(response.jwt)
        }
        return response as FetchDataResponse<UserResponse>;
    }
}

async function sendAuthRequest({
    authRelativeEndpoint,
    request,
    useJwt
}: {
    authRelativeEndpoint: string,
    request?: AuthRequest,
    useJwt?: boolean
}) {
    return await fetchData({
        endpoint: createEndPointUrl(`/auth${authRelativeEndpoint}`),
        method: "POST",
        extractJwt: true,
        body: request ?? {},
        useJwt
    }).then(authPreReturnHandler(true))
}

export async function signUp(request: RegisterUserRequest) {
    return await sendAuthRequest({
        authRelativeEndpoint: '/register',
        request
    });
}

export async function loginWithCredentials(request: AuthRequest) {
    return await sendAuthRequest({
        authRelativeEndpoint: '/login',
        request
    });
}

export async function loginWithJwt() {
    return await sendAuthRequest({
        authRelativeEndpoint: '/tokenLogin',
        useJwt: true
    });
}
