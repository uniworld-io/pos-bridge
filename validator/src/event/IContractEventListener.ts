
export interface IContractEventListener {
    listen(event:string, filter: any): void;
}