import * as fs from 'fs';

class Template {
    name:string
    subject:string
    path:string
    fields: string[]
    content: string

    constructor(name:string, subject:string, path:string, fields:string[]) {

        if (!name || !path || !fields) {
            throw new Error("Template error : name, path and fields are required")
        }

        this.content = this.readTemplate(path)
        this.validateContent(fields)

        this.name = name
        this.path = path
        this.fields = fields
        this.subject = subject
    }

    private readTemplate(path: string) : string {
        if (!fs.existsSync(path)) {
            throw new Error(`Template error: File at path "${path}" does not exist`);
        }

        return fs.readFileSync(path, 'utf-8');
    }

    private validateContent(fields:Array<string>) {

        const undefinedField = fields.find((field) => {
            return !this.content.includes(`{{.${field}}}`);
        })

        if (undefinedField) {
            throw new Error(`Template error: Field "${undefinedField}" is not defined in the template`);
        }
    }

    prepareContent(data: { [key: string]: any } | null) : string {
        
        if (!data) {
            return this.content;
        }

        let content = this.content;

        for (const field of this.fields) {
            const regex = new RegExp(`{{\\.${field}}}`, 'g');
            const value = data[field];
            if (value === undefined) {
                console.warn(`Template warn : Field "${field}" is not defined in the data object`);
                continue;
            }
            content = content.replace(regex, value);
        }

        return content;

    }
}

export default Template;