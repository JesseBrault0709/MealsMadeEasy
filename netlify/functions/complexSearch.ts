import type { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
    const message = process.env.MESSAGE
    return {
        statusCode: 200,
        body: JSON.stringify({ message })
    }
}

export { handler }