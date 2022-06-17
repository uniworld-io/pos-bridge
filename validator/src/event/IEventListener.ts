import {ContractEventHandler} from "../hander/ContractEventHandler";

export interface IEventListener {
    listenEventDeposit(handler: ContractEventHandler): void;
    listenEventWithdraw(handler: ContractEventHandler): void;
}
