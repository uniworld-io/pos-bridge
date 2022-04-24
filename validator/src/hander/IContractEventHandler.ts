
import {EventData} from "web3-eth-contract";

export interface IContractEventHandler {
    onEvent(message: EventData[]): void
}