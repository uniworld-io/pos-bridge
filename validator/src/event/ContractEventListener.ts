import {IContractEventListener} from "./IContractEventListener";
import {Contract} from "web3-eth-contract";
import Web3 from "web3";
import {IContractEventHandler} from "../hander/IContractEventHandler";

export class ContractEventListener implements IContractEventListener {
    private contract: Contract;

    constructor(chainHost: string, contractAddress?: string, abi?: any) {
        console.log(chainHost);
        console.log(contractAddress);
        console.log(abi);
        const web3 = new Web3(chainHost);
        this.contract = new web3.eth.Contract(abi, contractAddress);
    }

    listen(event: string, filter: any, handler: IContractEventHandler): void {
        this.contract.getPastEvents(event, filter)
            .then(result => {
                console.log('Listen contract capture: ', result);
                handler.onEvent(result);
            })
            .catch(error => console.error('RootChainEventListener: error capture event, ', error.message, error.stack))
    }
}


