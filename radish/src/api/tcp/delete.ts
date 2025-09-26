import KeyValueStorage from '../../storage/KeyValueStorage'
import RadishRequest from '../../pkg/request/RadishRequest'
import RadishResponse from '../../pkg/response/RadishResponse'

type DeleteHandlerBody = {
    key: string
}

export function deleteHandler(request:RadishRequest) : RadishResponse {
    const {key} = request.body as DeleteHandlerBody

    if (!key) {
        return RadishResponse.badRequest()
    }

    const record = KeyValueStorage.delete(key)
    if (!record) {
        return RadishResponse.notFound()
    }

    return RadishResponse.ok()
}
