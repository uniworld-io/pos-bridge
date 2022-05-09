import {IContractEventHandler} from "./IContractEventHandler";
import {RELAY_APP, VALIDATOR} from "../config/ConfigEnv";
import {Verification} from "../entity/Verification";
import {Crypto} from "../common/Crypto";
import {Constant} from "../common/Constant";
import {EventStandardization} from "../entity/EventStandardization";
const axios = require('axios').default;

const _ = require('lodash');
const Web3EthAbi = require('web3-eth-abi');
import EthCrypto from 'eth-crypto';


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
        let msgHash;
        let signature;
        let msg;
        let toChainId;

        if(result.eventName === Constant.WITHDRAW_EXEC){
            pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'childToken', 'burner', 'withdrawer', 'value']);
            msg = Web3EthAbi.encodeParameters(
                ['uint32', 'address', 'address', 'bytes'],
                [
                    Number(pickMsg.childChainId),
                    pickMsg.childToken,
                    pickMsg.receiver,
                    pickMsg.value
                ]);
            msgHash = EthCrypto.hash.keccak256([{type: "bytes", value: msg}]);
            signature = Crypto.getSignature(msgHash);
            toChainId = Number(pickMsg.rootChainId);
        }else if(result.eventName === Constant.DEPOSIT_EXEC){
            pickMsg = _.pick(result.values, ['rootChainId', 'childChainId', 'rootToken', 'depositor', 'receiver', 'value']);
            msg = Web3EthAbi.encodeParameters(
                ['uint32', 'address', 'address', 'bytes'],
                [
                    Number(pickMsg.rootChainId),
                    pickMsg.rootToken,
                    pickMsg.receiver,
                    pickMsg.value
                ]);
            msgHash = EthCrypto.hash.keccak256([{type: "bytes", value: msg}]);
            signature = Crypto.getSignature(msgHash);
            toChainId = Number(pickMsg.childChainId);
        }else {
            throw new Error('Event undefined ' + result)
        }

        return new Verification(toChainId, msgHash, msg, signature, eventType);
    }

}