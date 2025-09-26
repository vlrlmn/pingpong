class EmailSendRequest {
    distEmail: string;  
    template: string;
    data: { [key: string]: any } | null = null;
    content: string | null = null;

    constructor(data: any) {
        this.distEmail = data["email"];
        this.template = data["template"];
        this.data = data["data"] || null;  
        this.content = data["content"] || null;
    }

    validate(): boolean {
        // Basic validation
        if (!this.distEmail || !this.template) {
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.distEmail)) {
            return false;
        }

        return true;
    }
}

export default EmailSendRequest;