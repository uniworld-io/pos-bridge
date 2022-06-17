import {ContractEventHandler} from "../hander/ContractEventHandler";

export interface IEventListener {
    listenEventDeposit(handler: ContractEventHandler): Promise<void>;
    listenEventWithdraw(handler: ContractEventHandler): Promise<void>;
}
