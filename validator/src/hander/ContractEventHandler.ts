import {IContractEventHandler} from "./IContractEventHandler";
import {RELAY_APP} from "../config/ConfigEnv";
import {Verification} from "../entity/Verification";
import {Constant} from "../common/Constant";
import {EventStandardization} from "../entity/EventStandardization";
import {Utils} from "../common/Utils";

const axios = require('axios').default;
const _ = require('lodash');
const logger = require('../common/Logger')

export class ContractEventHandler implements IContractEventHandler {


    handle(result: EventStandardization): void {
        const verification = this.signMessage(result);
        console.log('Verification: ', verification);
        const url = RELAY_APP.HOST + '/' + RELAY_APP.API.COLLECT_VERIFICATION;
        axios.post(url, verification)
            .then((res: any) => console.log(res.data))
            .catch((error: any) => console.error(error));
    }


    private signMessage(result: EventStandardization): Verification {
        if (result.eventName === Constant.WITHDRAW_EXEC) {
            return this.signWithdrawExec(result);
        } else if (result.eventName === Constant.DEPOSIT_EXEC) {
            return this.signDepositExec(result);
        } else {
            logger.error('Event undefined %s', result)
            throw new Error('Event undefined ' + result)
        }
    }

    private signDepositExec(result: EventStandardization): any {
        const pickMsg = _.pick(result.values, ['rootChainId', 'childChainId', 'rootToken', 'depositor', 'receiver', 'depositData']);
        const msg = Utils.abiEncode(
            ['uint32', 'uint32', 'address', 'address', 'bytes'],
            [
                Number(pickMsg.rootChainId),
                Number(pickMsg.childChainId),
                pickMsg.rootToken,
                pickMsg.receiver,
                pickMsg.depositData
            ]);
        const msgHash = Utils.getHashKeccak256([{type: "bytes", value: msg}]);
        const signature = Utils.getSignature(msgHash);
        return new Verification(Number(pickMsg.childChainId), msgHash, msg, signature, result.eventName);
    }

    private signWithdrawExec(result: EventStandardization): any {
        const pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'childToken', 'burner', 'withdrawer', 'withdrawData']);
        const msg = Utils.abiEncode(
            ['uint32', 'uint32', 'address', 'address', 'bytes'],
            [
                Number(pickMsg.childChainId),
                Number(pickMsg.rootChainId),
                pickMsg.childToken,
                pickMsg.withdrawer,
                pickMsg.withdrawData
            ]);
        const msgHash = Utils.getHashKeccak256([{type: "bytes", value: msg}]);
        const signature = Utils.getSignature(msgHash);
        return new Verification(Number(pickMsg.rootChainId), msgHash, msg, signature, result.eventName);
    }

}