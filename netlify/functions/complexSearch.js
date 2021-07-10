import { doRequest } from "./util"

const handler = async event => {
    return doRequest('/recipes/complexSearch', event)
}

export { handler }