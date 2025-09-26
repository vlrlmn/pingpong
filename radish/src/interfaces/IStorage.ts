export default interface IStorage {
    get(key: string): any,
    set(key: string, value: any, lifeDuration:number): void,
    delete(key: string): void,
}