import RadishClient from "../client/client";
import RadishResponse from "../client/response";

function testGetProperty(client: RadishClient) : Promise<RadishResponse> {
    return client.get("test")
}

function testSetProperty(client: RadishClient) : Promise<RadishResponse> {
    return client.set("test", "example1")
}

function testDeleteProperty(client: RadishClient) : Promise<RadishResponse> {
    return client.delete("test")
}

function testSetExpire(client: RadishClient) : Promise<RadishResponse> {
    return client.set("test", "example2", 10)
}

function testGetExpire(client: RadishClient) : Promise<RadishResponse> {
    return client.get("test")
}

function testGetExpired(client: RadishClient) : Promise<RadishResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            client.get("test")
                .then(resolve)
                .catch(reject);
        }, 20000);
    });
}

function testGetUnknown(client: RadishClient) : Promise<RadishResponse> {
    return client.get("unknown")
}

export {
    testGetProperty,
    testSetProperty,
    testDeleteProperty,
    testSetExpire,
    testGetExpire,
    testGetExpired,
    testGetUnknown,
}