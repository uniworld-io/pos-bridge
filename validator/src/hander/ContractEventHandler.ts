import {IContractEventHandler} from "./IContractEventHandler";
import {EventData} from "web3-eth-contract";
import {Crypto} from "../common/Crypto";
import {PushRelayData} from "../common/PushRelayData";
import {IRelayFeignClient} from "../fignclient/IRelayFeignClient";
import {Constant} from "../common/Constant";

export class ContractEventHandler implements IContractEventHandler{
    private static readonly validator = process.env.VALIDATOR_ADDRESS as string;
    private relayFeignClient: IRelayFeignClient;

    constructor(relayFeignClient: IRelayFeignClient) {
        this.relayFeignClient = relayFeignClient;
    }

    onEvent(message: EventData[]): void {
        message.forEach(item => {
            const msg = JSON.stringify(item.returnValues);
            const msgHash = Crypto.getHash(msg);
            const signature = Crypto.getSignature(msgHash);
            const pushRelayData = new PushRelayData(ContractEventHandler.validator, msgHash, msg, signature);
            console.log('Before push data to relay: ', pushRelayData.toJSON())
            this.postDataToRelayForwarder(item.event, pushRelayData);
        })
    }

    postDataToRelayForwarder(event:string, data: PushRelayData): void{
        switch (event){
            case Constant.DEPOSIT_EVENT:
                this.relayFeignClient.postDeposit(data);
                break;
            case Constant.WITHDRAW_EVENT:
                this.relayFeignClient.postWithdraw(data);
                break
            default:
                break;
        }
    }

}