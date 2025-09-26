import RadishClient from "../../client/client";

const client = new RadishClient({
    host: "localhost",
    port: 5000,
})

setTimeout(() => {
    client.set("key", "example1")
}, 1000)

setTimeout(async () => {
    const response = await client.get("key")
    console.log("Response:", response.value);
}, 2000)
