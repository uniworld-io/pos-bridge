import {IContractEventListener} from "./IContractEventListener";
import {Contract} from "web3-eth-contract";
import Web3 from "web3";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Crypto} from "../common/Crypto";
import {Verification} from "../entity/Verification";
import {VALIDATOR} from "../common/ConfigEnv";

export class Web3ContractEventListener implements IContractEventListener {
    private contract: Contract;
    private handler: IContractEventHandler;

    constructor(chainConnector: Web3, contractAddress: string, abi: any, handler: IContractEventHandler) {
        console.log(chainConnector);
        console.log(contractAddress);
        console.log(abi);
        this.handler = handler;
        this.contract = new chainConnector.eth.Contract(abi, contractAddress);
    }

     listen(event: string, filter: any): void {
        this.contract.getPastEvents(event, filter)
            .then(result => {
                console.log('Listen contract capture: ', result);

                result.forEach(item => {
                    const msg = item.returnValues;
                    const msgHash = Crypto.getHash(JSON.stringify(msg));
                    const signature = Crypto.getSignature(msgHash);
                    const verification = new Verification(VALIDATOR.ADDRESS, msgHash, msg, signature, item.event);

                    console.log('Before push data to relay: ', verification.toJSON())
                    this.handler.handle(verification);
                })


            })
            .catch(error => console.error('RootChainEventListener: error capture event, ', error.message, error.stack));
    }
}


