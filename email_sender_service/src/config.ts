class ServiceConfig {
    port : number
    host : string
    templatesPath : string
    smtpEmail : string
    smtpPass : string

    constructor() {
        const args = process.argv.splice(2)
        if (args.length != 5) {
            throw new Error("ESS error : invalid arguments <host> <port> <templates-config> <email> <pass>")
        }
        this.host = args[0]
        this.port = Number(args[1])
        this.templatesPath = args[2]
        this.smtpEmail = args[3]
        this.smtpPass = args[4]
    }
}

export default ServiceConfig;