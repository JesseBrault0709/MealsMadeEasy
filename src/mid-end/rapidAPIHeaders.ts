export const rapidAPIKey = "2fe36db684msh7457326c31ccfaap191e9ajsn0dd68a04fb06"
export const rapidAPIHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

export const rapidAPIHeaders = {
    'x-rapidapi-key': rapidAPIKey,
    'x-rapidapi-host': rapidAPIHost
}

export type RapidAPIResponseHeaders = {
    'x-ratelimit-requests-limit': string,
    'x-ratelimit-requests-remaining': string,
    'x-ratelimit-results-limit': string,
    'x-ratelimit-results-remaining': string,
    'x-ratelimit-tinyrequests-limit': string,
    'x-ratelimit-tinyrequests-remaining': string
}