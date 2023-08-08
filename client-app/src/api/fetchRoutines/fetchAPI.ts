import { getJwt } from "../jwt/jwt";

const FETCH_DELAY_MS = 650

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface FetchDataArgs {
    endpoint: string,
    method: 'GET' | 'POST',
    body?: any,
    useJwt?: boolean,
    extractJwt?: boolean,
    contentType?: string
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
    contentType
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
                'Content-Type': contentType ?? 'application/json',
                'Authorization': useJwt ? `Bearer ${getJwt()}` : ''
            },
            body: method === "POST" ? JSON.stringify(body) : undefined
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
                console.error('ERROR: Cannot parse response as JSON.');
                console.error(err);
            })
        }
        else {
            console.error('ERROR: Server returned error response.');
            console.error(res);
        }
    }).catch(err => {
        console.error('ERROR: Error while invoking `fetch`.');
        console.error(err);
    });
    
    await wait(FETCH_DELAY_MS);

    return response;
}
