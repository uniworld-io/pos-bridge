"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEventHandler = void 0;
const ConfigEnv_1 = require("../config/ConfigEnv");
const Verification_1 = require("../entity/Verification");
const Crypto_1 = require("../common/Crypto");
const Constant_1 = require("../common/Constant");
const axios = require('axios').default;
const _ = require('lodash');
class ContractEventHandler {
    handle(result) {
        const verification = this.signMessage(result);
        const url = ConfigEnv_1.RELAY_APP.HOST + '/' + ConfigEnv_1.RELAY_APP.API.COLLECT_VERIFICATION;
        axios.post(url, verification)
            .then((res) => console.log(res.data))
            .catch((error) => console.error(error));
    }
    signMessage(result) {
        const eventType = result.eventName;
        let pickMsg;
        if (eventType === Constant_1.Constant.WITHDRAW_EXEC) {
            pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'childToken', 'burner', 'withdrawer', 'value']);
        }
        else if (eventType === Constant_1.Constant.DEPOSIT_EXEC) {
            pickMsg = _.pick(result.values, ['childChainId', 'rootChainId', 'rootToken', 'depositor', 'receiver', 'value']);
        }
        else {
            throw new Error('Event undefined ' + result);
        }
        const msg = Object.assign(Object.assign({}, pickMsg), { childChainId: Number(pickMsg.childChainId), rootChainId: Number(pickMsg.rootChainId), value: Number(pickMsg.value) });
        const msgHash = Crypto_1.Crypto.getHash(JSON.stringify(msg));
        const signature = Crypto_1.Crypto.getSignature(msgHash);
        return new Verification_1.Verification(ConfigEnv_1.VALIDATOR.ADDRESS, msgHash, msg, signature, eventType);
    }
}
exports.ContractEventHandler = ContractEventHandler;
