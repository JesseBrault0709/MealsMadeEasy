import { rapidAPIHost, RapidAPIResponseHeaders } from "./rapidAPIHeaders"

export function calcUrl(endPoint: string): string {
    return `https://${rapidAPIHost}${endPoint}`
}

export function logRemainingHeaders(headers: RapidAPIResponseHeaders) {
    const { 
        "x-ratelimit-requests-remaining": requestsRemaining,
        "x-ratelimit-results-remaining": resultsRemaining
    } = headers
    console.log({ requestsRemaining, resultsRemaining})
}