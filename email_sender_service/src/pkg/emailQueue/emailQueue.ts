import EmailSendRequest from "../emailSendRequest/emailSendRequest";
import TemplateStorage from "../templateStorage/templateStorage";
import nodemailer from "nodemailer";

type EmailQueueConfig = {
    email: string,
    pass: string,
    templatesPath: string,
}

class EmailQueue {
    static templateStorage = new TemplateStorage()
    
    private static config:EmailQueueConfig 

    private static isSetup = false
    private static queue: Array<EmailSendRequest> = []
    private static isProcessing = false
    private static interval: NodeJS.Timeout | null = null

    static setup(config:EmailQueueConfig) {
        if (this.isSetup) {
            console.warn("EmailQueue warn : EmailQueue is already setup");
            return
        }

        if (!config.email || !config.pass) {
            throw new Error("EmailQueue error : SMTP credentials are not defined")
        }

        this.config = config
        this.templateStorage.loadFromFile(config.templatesPath)
        this.isSetup = true
    
        this.interval = setInterval(this.processQueue.bind(this), 100)
    }

    static shutdown() {
        if (!this.isSetup) {
            console.warn("EmailQueue warn : EmailQueue is not setup");
            return
        }

        if (this.interval) {
            clearInterval(this.interval)
        }
        this.isSetup = false
    }

    static add(request:EmailSendRequest) {
        if (!this.isSetup) {
            throw new Error("EmailQueue error : EmailQueue is not setup")
        }

        // Check is template is valid
        this.templateStorage.getTemplate(request.template)

        this.queue.push(request)
    }

    private static async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return
        }
        this.isProcessing = true

        const emailRequest = this.queue.pop();
        if (!emailRequest) {
            return;
        }

        if (!this.config.email) {
            console.error("💀 SMTP_EMAIL is not defined");
            this.isProcessing = false;
            return;
        }

        if (!this.config.pass) {
            console.error("💀 SMTP_PASS is not defined");
            this.isProcessing = false;
            return;
        }

        const template = this.templateStorage.getTemplate(emailRequest.template)


        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: this.config.email, // your SMTP username
                    pass: this.config.pass, // your SMTP password
                },
            });

            const mailOptions:nodemailer.SendMailOptions = {
                from: this.config.email,
                to: emailRequest.distEmail,
                subject: template.subject,
            };
            
            if (emailRequest.content) {
                mailOptions["text"] = emailRequest.content;
            } else {
                mailOptions["html"] = template.prepareContent(emailRequest.data);
            }

            const response = await transporter.sendMail(mailOptions);
            if (response.accepted.length == 0) {
                console.warn(`Email was not accepted by any recipients.`);
            }
        } catch (error) {
            console.error(`Error while sending email: ${error}`);
        } finally {
            this.isProcessing = false;
        }
    }
}

export default EmailQueue;