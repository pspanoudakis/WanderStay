import { getJwt } from "../jwt/jwt";

const FETCH_DELAY_MS = 650
const SERVER_DOMAIN_URL = "https://localhost:8080"

export function createEndPointUrl(postfix: string){
    return SERVER_DOMAIN_URL + postfix;
}

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface FetchDataArgs {
    endpoint: string,
    method: 'GET' | 'POST',
    body?: any,
    useJwt?: boolean,
    extractJwt?: boolean,
    useRawBody?: boolean,
    omitContentType?: boolean
}

export type FetchDataResponse<T> = {
    //content?: T,
    content: T,
    ok: boolean,
    jwt?: string,
}

export async function fetchData({
    endpoint,
    method,
    body,
    useJwt,
    extractJwt,
    useRawBody,
    omitContentType
}: FetchDataArgs): Promise<FetchDataResponse<unknown>> {

    let response: FetchDataResponse<unknown> = {
        content: {},
        ok: false
    }
    await fetch(
        endpoint,
        {
            method,
            headers: {
                'Accept': 'application/json',
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
        ).then(res => {
        if (res.ok) {
            res.json().then( content => {
                console.log(content);
                response = {
                    content,
                    ok: true,
                    jwt: extractJwt && res.headers.get('Authorization') || undefined
                };
            }).catch(err => {
                console.error('FETCH ERROR: Cannot parse response as JSON.');
                console.error(err);
            })
        }
        else {
            console.error('FETCH ERROR: Server returned error response.');
            console.error(res);
        }
    }).catch(err => {
        console.error('FETCH ERROR: Error while invoking `fetch`.');
        console.error(err);
    });
    
    await wait(FETCH_DELAY_MS);

    return response;
}
