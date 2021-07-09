import type { Handler } from '@netlify/functions'

import axios from 'axios'

const rapidAPIHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

export function calcUrl(endPoint: string): string {
    return `https://${rapidAPIHost}${endPoint}`
}

const handler: Handler = async (event, context) => {

    const apiKey = process.env.SPOONACULAR_KEY

    const results = await axios.get(
        calcUrl('/recipes/complexSearch'),
        {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': rapidAPIHost
            }
        }
    )

    console.log({
        results
    })

    return {
        statusCode: 200,
        body: JSON.stringify({ results })
    }
}

export { handler }