import {IContractEventHandler} from "./IContractEventHandler";
import {EventData} from "web3-eth-contract";
import {Crypto} from "../common/Crypto";
import {PushRelayData} from "../common/PushRelayData";
import {IRelayFeignClient} from "../fignclient/IRelayFeignClient";
import {VALIDATOR} from "../common/ConfigEnv";

export class ContractEventHandler implements IContractEventHandler{
    private static readonly validator = VALIDATOR.ADDRESS;
    private relayFeignClient: IRelayFeignClient;

    constructor(relayFeignClient: IRelayFeignClient) {
        this.relayFeignClient = relayFeignClient;
    }

    onEvent(message: EventData[]): void {
        message.forEach(item => {
            const msg = item.returnValues;
            const msgHash = Crypto.getHash(JSON.stringify(msg));
            const signature = Crypto.getSignature(msgHash);
            const pushRelayData = new PushRelayData(ContractEventHandler.validator, msgHash, msg, signature, item.event);
            console.log('Before push data to relay: ', pushRelayData.toJSON())
            this.relayFeignClient.postToCollectEvent(pushRelayData);
        })
    }

}