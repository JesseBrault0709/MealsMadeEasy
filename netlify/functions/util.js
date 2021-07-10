const axios = require('axios').default

const rapidAPIHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

export function calcUrl(endPoint) {
    return `https://${rapidAPIHost}${endPoint}`
}

export function logRemainingHeaders(headers) {
    const { 
        "x-ratelimit-requests-remaining": requestsRemaining,
        "x-ratelimit-results-remaining": resultsRemaining
    } = headers
    console.log({ requestsRemaining, resultsRemaining})
}

export const doRequest = async (endPoint, event) => {

    const { queryStringParameters } = event

    console.log({
        queryStringParameters
    })

    const apiKey = process.env.SPOONACULAR_KEY

    const { status, statusText, headers, data } = await axios.get(
        calcUrl(endPoint),
        {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': rapidAPIHost
            },
            params: queryStringParameters
        }
    )

    const { 
        "x-ratelimit-requests-remaining": requestsRemaining,
        "x-ratelimit-results-remaining": resultsRemaining
    } = headers

    console.log({
        status,
        statusText,
        requestsRemaining,
        resultsRemaining
    })

    return {
        statusCode,
        body: JSON.stringify(data)
    }
}