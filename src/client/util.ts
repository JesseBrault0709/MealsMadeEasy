const host = "sharp-beaver-8b4795.netlify.app/.netlify/functions"

export function calcUrl(endPoint: string): string {
    return `https://${host}${endPoint}`
}