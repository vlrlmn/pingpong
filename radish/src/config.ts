import dotenv from "dotenv";

dotenv.config();

export default class Config {
    port: number;
    mode: string;
    host: string;
    backupFile: string;
    constructor() {
        this.mode = process.env.MODE || "development";
        this.port = parseInt(process.env.PORT || "5100");
        this.host = this.mode === 'production' ?
            '0.0.0.0' : 'localhost'
        this.backupFile = this.mode === 'production' ? 
            '/app/data/data.json' : './data.json';
        
        console.log("backupFile:", this.backupFile);
    }
}