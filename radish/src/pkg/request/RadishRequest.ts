type RequestType = 'GET' | 'SET' | 'DEL'

export default class RadishRequest {
    type: RequestType;
    body: Record<string, any>;
    raw: string;

    constructor(input:string) {
        const obj = JSON.parse(input);
        const {type, data} = obj;
        if (type === undefined || !['GET', 'SET', 'DEL'].includes(type)) {
            throw new Error('Request error: type invalid or missing');
        }
        if (data === undefined || typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error('Request error: data invalid or missing');
        }
        this.body = data;
        this.raw = input;
        this.type = obj.type;
    }
}