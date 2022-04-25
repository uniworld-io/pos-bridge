import {IContractEventHandler} from "../hander/IContractEventHandler";

export interface IContractEventListener {
    listen(event:string, filter: any, handler: IContractEventHandler): void;
}