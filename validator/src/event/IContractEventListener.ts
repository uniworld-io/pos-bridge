import {IContractEventHandler} from "../hander/IContractEventHandler";

export interface IContractEventListener {
    listen(emit:string, filter: any, handler: IContractEventHandler): void;
}