import KeyValueStorage from '../../storage/KeyValueStorage'
import RadishRequest from '../../pkg/request/RadishRequest'
import RadishResponse from '../../pkg/response/RadishResponse'

type SetHandlerBody = {
    key: string
    value: any
    expire: number | undefined
}    

export function setHandler(request: RadishRequest) : RadishResponse {
    const { key, value, expire } = request.body as SetHandlerBody

    if (!key || !value) {
        return RadishResponse.badRequest()
    }

    if (KeyValueStorage.get(key)) {
        return RadishResponse.error(409, "Key already exists.")
    }
    
    KeyValueStorage.set(key, value, expire)
    return RadishResponse.response(201, { message: 'Created.' })
}
