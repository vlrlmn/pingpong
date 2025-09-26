type RadishResponseParams = {
    status: number;
    error?: string;
    data?: Record<string, any>;
}

export default class RadishResponse {
    status: number;
    error: string | undefined;
    data: Record<string, any> | undefined;

    private constructor(params: RadishResponseParams) {
        this.status = params.status;
        this.error = params.error;
        this.data = params.data;
    }

    toJSON() {
        const toSubmit = {
            status: this.status,
            error: this.error,
            data: JSON.stringify(this.data),
        }

        return JSON.stringify(toSubmit); 
    }

    static response(status: number, data: Record<string, any> | undefined = undefined) {
        return new RadishResponse({status, data})
    }

    static error(status: number, error: string) {
        return new RadishResponse({status, error})
    }

    static notFound() {
        return new RadishResponse({status: 404, error: 'Command not found'})
    }

    static badRequest() {
        return new RadishResponse({status: 400, error: 'Invalid request'})
    }

    static internalServerError() {
        return new RadishResponse({status: 500, error: 'Internal server error'})
    }

    static ok(data: Record<string, any> | undefined = undefined) {
        return new RadishResponse({status: 200, data})
    }
}