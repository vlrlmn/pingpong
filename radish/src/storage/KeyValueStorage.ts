import RecordValue from "../pkg/Record";
import DeleteQueue from "./DeleteQueue";

export default class KeyValueStorage {
    private static data:Map<string, RecordValue> = new Map();
    private static deleteQueue = new DeleteQueue(KeyValueStorage.onRemoveHandler);   

    private static onRemoveHandler(item: RecordValue) {
        const key = item.key
        KeyValueStorage.data.delete(key);
    }

    public static set(key: string, value: any, expire:number | undefined) : void{

        let expireAt = undefined;
        if (expire !== undefined) {
            const now = Math.round(new Date().getTime() / 1000)
            expireAt = now + Math.round(expire);
        }

        const record = new RecordValue(key, value, expireAt);
        KeyValueStorage.data.set(key, record);
        if (expire) {
            KeyValueStorage.deleteQueue.add(record);
        }
    }

    public static get(key: string) : any {
        return KeyValueStorage.data.get(key)?._value;
    }

    public static delete(key: string) : RecordValue | undefined {
        const record = KeyValueStorage.data.get(key);
        if (record) {
            KeyValueStorage.data.delete(key);
        }
        return record;
    }

    public static importState(state: Map<string, RecordValue>) {
        state.forEach((record) => {
            if (!record.expireAt) {
                KeyValueStorage.data.set(record.key, record);
                return;
            }

            const now = Math.round(new Date().getTime() / 1000);
            const expire = Math.round(record.expireAt - now);
            if (expire > 0) {
                this.set(record.key, record._value, expire);
            }
        });
    }

    public static exportState() {
        return KeyValueStorage.data;
    }
}