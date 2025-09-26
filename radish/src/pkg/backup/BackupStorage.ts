import KeyValueStorage from "../../storage/KeyValueStorage";
import RecordValue from "../Record";
import fs, { stat } from 'fs';

export default class BackupStorage {
    static load(path:string) {
        if (!fs.existsSync(path)) {
            return ;
        }

        const raw = fs.readFileSync(path, 'utf-8');
        if (!raw) {
            return ;
        }
        const obj = JSON.parse(raw)
    
        const state = new Map<string, any>();
        Object.keys(obj).forEach((key) => {
            const backupRecord = obj[key];
    
            if (!backupRecord.key || !backupRecord._value) {
                console.error(`Invalid record in backup file: ${key}`);
                return;
            }
            state.set(key, new RecordValue(backupRecord.key, backupRecord._value, backupRecord.expireAt));
        })
    
        KeyValueStorage.importState(state);
    }

    static save(path:string) {
        const state = KeyValueStorage.exportState();

        fs.writeFileSync(path, JSON.stringify(Object.fromEntries(state), null, 2));
        console.log('\nState saved to file. Exiting.');
        process.exit(0);
    }
}