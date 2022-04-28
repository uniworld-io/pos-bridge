import {IContractEventHandler} from "./IContractEventHandler";
import {RELAY_APP, VALIDATOR} from "../config/ConfigEnv";
import {Verification} from "../entity/Verification";
import {Crypto} from "../common/Crypto";
import {Constant} from "../common/Constant";
import {EventStandardization} from "../entity/EventStandardization";
const axios = require('axios').default;

const _ = require('lodash');


export class ContractEventHandler implements IContractEventHandler {


    handle(result: EventStandardization): void {
        const verification = this.signMessage(result);

        const url = RELAY_APP.HOST + '/' + RELAY_APP.API.COLLECT_VERIFICATION;
        axios.post(url, verification)
            .then((res:any) => console.log(res.data))
            .catch((error: any) => console.error(error));
    }


    private signMessage(result: EventStandardization): Verification{
        const eventType = result.eventName;
        let pickMsg;
        if(eventType === Constant.WITHDRAW_EXEC){
            pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'childToken', 'burner', 'withdrawer', 'value']);
        }else if(eventType === Constant.DEPOSIT_EXEC){
            pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'rootToken', 'depositor', 'receiver', 'value']);
        }else {
            throw new Error('Event undefined ' + result)
        }

        const msg = {
            ...pickMsg,
            childChainId: Number(pickMsg.childChainId),
            rootChainId: Number(pickMsg.rootChainId),
            value: Number(pickMsg.value)
        }
        const msgHash = Crypto.getHash(JSON.stringify(msg));
        const signature = Crypto.getSignature(msgHash);

        return new Verification(VALIDATOR.ADDRESS, msgHash, msg, signature, eventType);
    }

}