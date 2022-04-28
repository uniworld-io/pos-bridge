import {IContractEventListener} from "./IContractEventListener";
import {Contract} from "web3-eth-contract";
import Web3 from "web3";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Crypto} from "../common/Crypto";
import {Verification} from "../entity/Verification";
import {VALIDATOR} from "../config/ConfigEnv";
import {Constant} from "../common/Constant";

const _ = require('lodash');

export class Web3ContractEventListener implements IContractEventListener {
    private readonly contract: Contract;
    private handler: IContractEventHandler;

    constructor(chainConnector: Web3, contractAddress: string, abi: any, handler: IContractEventHandler) {
        this.handler = handler;
        this.contract = new chainConnector.eth.Contract(abi, contractAddress);
        console.log('Generate listener event for contract:', contractAddress);
    }

    listen(event: string, filter: any): void {
        this.contract.once(event, filter, (error: any, result: any) => {
            if (error)
                console.log('ERROR: ', error)

            console.log('CaptureEvent: ', result);
            if (result) {

                const msg = this.makeMsg(event, result.returnValues);
                const msgHash = Crypto.getHash(JSON.stringify(msg));
                const signature = Crypto.getSignature(msgHash);
                const verification = new Verification(VALIDATOR.ADDRESS, msgHash, msg, signature, result.event);

                console.log('Before push data to relay: ', verification)
                this.handler.handle(verification);
            }
        })
    }

    private makeMsg(event: string, returnValues: any): any{
        let pickMsg;
        if(event === Constant.DEPOSIT_EXEC){
             pickMsg = _.pick(returnValues, ['childChainId', 'rootChainId', 'rootToken', 'depositor', 'receiver', 'value']);
        }
        if(event === Constant.WITHDRAW_EXEC){
            pickMsg = _.pick(returnValues, ['childChainId', 'rootChainId', 'childToken', 'burner','wthdrawer', 'value']);
        }
        return {
            ...pickMsg,
            childChainId: Number(returnValues.childChainId),
            rootChainId: Number(returnValues.rootChainId),
            value: Number(returnValues.value)
        };
    }
}


