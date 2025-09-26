import Template from "./template";
import * as fs from "fs";

type TemplateStorageConfig = Array<{
    name:string,
    subject:string,
    path:string,
    fields:Array<string>
}>

class TemplateStorage {
    private templates: Array<Template> = [];

    public loadFromFile(path: string): void {
        if (!fs.existsSync(path)) {
            throw new Error(`TemplateStorage error: File at path "${path}" does not exist`);
        }

        const fileContent = fs.readFileSync(path, "utf-8");
        const templates:TemplateStorageConfig = JSON.parse(fileContent);
        templates.forEach((templateConfig) => {
            try {
                const template = new Template(
                    templateConfig.name,
                    templateConfig.subject,
                    templateConfig.path,
                    templateConfig.fields
                );
                this.templates.push(template);
                console.info(`✅ Template loaded successfully: ${templateConfig.name}`);
            } catch (error) {
                console.info(`❌ Template not loaded: ${error}`);
            }
        })
    }
    public getTemplate(templateName: string ) : Template {
        if (this.templates.length === 0) {
            throw new Error(`TemplateStorage error: No template found`);
        }
        const template = this.templates.find((template) => template.name === templateName);
        if (!template) {
            throw new Error(`TemplateStorage error: Template "${templateName}" not found`);
        }
        return template
    }
}

export default TemplateStorage;