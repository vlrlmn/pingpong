import RadishClient from "../client/client"
import RadishResponse from "../client/response";
import { testDeleteProperty, testGetExpire, testGetExpired, testGetProperty, testGetUnknown, testSetExpire, testSetProperty } from "./tests";

class Test {
    private name: string;
    private conn : RadishClient;
    private testAction: (conn: RadishClient) => Promise<RadishResponse>;
    constructor(name: string, conn: RadishClient, testAction: (conn:RadishClient) => Promise<RadishResponse>) {
        this.conn = conn;
        this.name = name;
        this.testAction = testAction;
    }

    async execute(expectedStatus: number, expectedValue: any = undefined) {
        const response = await this.testAction(this.conn);
        const message = response.status === expectedStatus ?
            `✅ Test '${this.name}' passed!` :
            `❌ Test '${this.name}' failed: expected ${expectedStatus}, got ${response.status}`;
        console.log(message);
        console.log(response.data)
    }
}



function main(){
    const client = new RadishClient({
       host: "localhost",
       port: 5100, 
    })

    const tests:Array<{test: Test, expectedStatus: number}> = [
        
        // Basic
        {test: new Test("Set property", client, testSetProperty), expectedStatus: 201},
        {test: new Test("Set property twice", client, testSetProperty), expectedStatus: 409},
        {test: new Test("Get property", client, testGetProperty), expectedStatus: 200},
        {test: new Test("Delete property", client, testDeleteProperty), expectedStatus: 200},
        {test: new Test("Delete property twice", client, testDeleteProperty), expectedStatus: 404},
        {test: new Test("Get unknown property", client, testGetUnknown), expectedStatus: 404},
        
        // Expire
        {test: new Test("Set property with expire", client, testSetExpire), expectedStatus: 201},
        {test: new Test("Get property with expire", client, testGetExpire), expectedStatus: 200},
        {test: new Test("Get property after expire", client, testGetExpired), expectedStatus: 404},
    ]

    tests.forEach(async (pair) => {
        await pair.test.execute(pair.expectedStatus);
    })
}

main()