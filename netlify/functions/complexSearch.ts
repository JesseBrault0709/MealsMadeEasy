import type { Handler } from '@netlify/functions'

import axios from 'axios'

const rapidAPIHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

function calcUrl(endPoint: string): string {
    return `https://${rapidAPIHost}${endPoint}`
}

function logRemainingHeaders(headers: any) {
    const { 
        "x-ratelimit-requests-remaining": requestsRemaining,
        "x-ratelimit-results-remaining": resultsRemaining
    } = headers
    console.log({ requestsRemaining, resultsRemaining})
}

const handler: Handler = async (event) => {

    console.log({
        queryStringParameters: event.queryStringParameters
    })

    const apiKey = process.env.SPOONACULAR_KEY

    const { status, statusText, headers, data }= await axios.get(
        calcUrl('/recipes/complexSearch'),
        {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': rapidAPIHost
            },
            params: event.queryStringParameters
        }
    )

    console.log({
        status, statusText
    })

    logRemainingHeaders(headers)

    return {
        statusCode: 200,
        body: JSON.stringify({ results: data.results })
    }
}

export { handler }