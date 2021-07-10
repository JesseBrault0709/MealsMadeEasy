import { doRequest } from "./util"

const handler = async event => {
    
    const { id } = event.queryStringParamters

    console.log({ id })

    return doRequest(`/recipes/${id}/information`, event)
    
}

export { handler }