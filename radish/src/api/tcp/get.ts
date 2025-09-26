import KeyValueStorage from '../../storage/KeyValueStorage'
import RadishRequest from '../../pkg/request/RadishRequest'
import RadishResponse from '../../pkg/response/RadishResponse'

type GetHandlerBody = {
    key: string
}

export default function getHandler(request: RadishRequest) : RadishResponse {
    const { key } = request.body as GetHandlerBody

    if (!key) {
        return RadishResponse.badRequest()
    }

    const value = KeyValueStorage.get(key)
    if (!value) {
        return RadishResponse.notFound()
    }

    return RadishResponse.ok({ value })
}
