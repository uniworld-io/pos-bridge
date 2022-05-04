"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawExecCaller = void 0;
const ConfigEnv_1 = require("../../config/ConfigEnv");
const Web3EthAbi = require('web3-eth-abi');
class WithdrawExecCaller {
    call(manager, data) {
        switch (manager.getChainId()) {
            case ConfigEnv_1.CHAIN.ETH.ID:
            case ConfigEnv_1.CHAIN.BSC.ID:
                this.web3Call(manager, data);
                break;
            case ConfigEnv_1.CHAIN.UNI.ID:
                this.uniCall(manager, data);
                break;
            default:
                throw new Error('Not mapped caller');
        }
    }
    web3Call(manager, verification) {
        const msg = verification.msg;
        const contract = manager.getRoot();
        //@todo
        const msgEncode = Web3EthAbi.encodeParameters(['uint', 'address', 'address', 'uint256'], [
            msg.childChainId,
            msg.childToken,
            msg.withdrawer,
            msg.value
        ]);
        contract.methods.withdrawExecuted(verification.msgHash, msgEncode, verification.signatures)
            .send(ConfigEnv_1.TRANSACTION.OPTIONS, (error, txHash) => {
            if (error)
                console.error('Error call function contract:', error);
            if (txHash)
                console.log('TxHash: ', txHash);
        });
    }
    //@todo
    uniCall(manager, verification) {
    }
}
exports.WithdrawExecCaller = WithdrawExecCaller;
