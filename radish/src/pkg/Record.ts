export default class RecordValue{
    key: string;
    _value: any;
    expireAt: number|undefined = undefined;
    constructor(key:string, value: any, expireAt: number|undefined = undefined) {
        this.key = key;
        this._value = value;
        this.expireAt = expireAt;   
    }
}