import { getJwt } from "../jwt/jwt";

const FETCH_DELAY_MS = 650
const SERVER_DOMAIN_URL = "https://localhost:8080"

export enum SupportedAcceptType {
    APPLICATION_JSON = 'application/json',
    APPLICATION_XML = 'application/xml'
}

export function createEndPointUrl(postfix: string){
    return SERVER_DOMAIN_URL + postfix;
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
                ...(!omitContentType && {'Content-Type': 'application/json'}),
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

    let response: FetchDataResponse<unknown> = {
        content: {},
        ok: false,
    }
    const {extractJwt, ...fetchWrapperArgs} = args;
    const returnAsText = (
        fetchWrapperArgs.acceptType &&
        fetchWrapperArgs.acceptType !== SupportedAcceptType.APPLICATION_JSON
    );

    await fetchWrapper(fetchWrapperArgs)
    .then(res => {
        if (res.ok) {
            (returnAsText ? res.text() : res.json())
            .then(content => {
                response = {
                    content,
                    ok: true,
                    jwt: (extractJwt && res.headers.get('Authorization')) || undefined
                }
                console.log(response.content);
            }).catch(err => {
                console.error(`FETCH ERROR: Cannot parse response as ${returnAsText ? 'TEXT' : 'JSON'}.`);
                console.error(err);
            })
        }
        else {
            console.error('FETCH ERROR: Server returned error response.');
            res.json().then(content => {
                console.error(`HTTP ${res.status}: ${content.error}`)
                response.error = content.error;
            }).catch(() => {})
        }
    }).catch(err => {
        console.error('FETCH ERROR: Error while invoking `fetch`.');
        console.error(err);
    });
    
    await wait(FETCH_DELAY_MS);

    return response;
}
