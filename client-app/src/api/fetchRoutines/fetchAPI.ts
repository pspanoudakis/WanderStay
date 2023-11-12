import { getJwt } from "../jwt/jwt";

const FETCH_DELAY_MS = 550;
const SERVER_DOMAIN_URL = "localhost:8080";

export enum SupportedAcceptType {
    APPLICATION_JSON = 'application/json',
    APPLICATION_XML = 'application/xml'
}

export function createEndPointUrl(postfix: string, options: {useSocket: boolean | undefined} | undefined){
    const prefix = options?.useSocket ? 'wss://' : 'https://';
    return prefix + SERVER_DOMAIN_URL + postfix;
}

export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type FetchDataHttpMethod = 'GET' | 'POST';

export type FetchWrapperArgs = {
    endpoint: string,
    method: FetchDataHttpMethod,
    body?: any,
    useJwt?: boolean,
    useRawBody?: boolean,
    omitContentType?: boolean,
    acceptType?: SupportedAcceptType
}

export type FetchDataArgs = {
    extractJwt?: boolean,
} & FetchWrapperArgs

export type FetchDataResponse<T> = {
    content: T,
    ok: boolean,
    statusCode: number,
    jwt?: string,
    error?: string,
}

function fetchWrapper({
    endpoint,
    method,
    body,
    useJwt,
    useRawBody,
    omitContentType,
    acceptType,
}: FetchWrapperArgs): Promise<Response> {
    return fetch(
        endpoint,
        {
            method,
            headers: {
                'Accept': acceptType ?? SupportedAcceptType.APPLICATION_JSON,
                'Authorization': useJwt ? `Bearer ${getJwt()}` : '',
                ...(!omitContentType && {'Content-Type': SupportedAcceptType.APPLICATION_JSON}),
            },
            body: (
                method === "POST" ? 
                    (useRawBody ? body : JSON.stringify(body))
                    : 
                    undefined
            )
        }
    );
}

export async function fetchData(args: FetchDataArgs): Promise<FetchDataResponse<unknown>> {

    await wait(FETCH_DELAY_MS);

    let response: FetchDataResponse<unknown> = {
        content: {},
        ok: false,
        statusCode: -1,
    }
    const {extractJwt, ...fetchWrapperArgs} = args;
    const returnAsText = (
        fetchWrapperArgs.acceptType &&
        fetchWrapperArgs.acceptType !== SupportedAcceptType.APPLICATION_JSON
    );   
    
    try {
        const res = await fetchWrapper(fetchWrapperArgs);
        response.statusCode = res.status;
        if (res.ok) {
            try {
                const content = (
                    returnAsText ? await res.text() : await res.json()
                );
                response = {
                    content,
                    ok: true,
                    statusCode: response.statusCode,
                    jwt: (extractJwt && res.headers.get('Authorization')) || undefined
                }
                console.log(response.content);
            } catch (err) {
                console.error(`FETCH ERROR: Cannot parse response as ${returnAsText ? 'TEXT' : 'JSON'}.`);
                console.error(err);
            }
        }
        else {
            console.error('FETCH ERROR: Server returned error response.');
            try {
                const content = await res.json();
                console.error(`HTTP ${res.status}: ${content.error}`)
                response.error = content.error;
            } catch (error) {}
        }
    } catch (err) {
        console.error('FETCH ERROR: Error while invoking `fetch`.');
        console.error(err);
    }

    return response;
}
