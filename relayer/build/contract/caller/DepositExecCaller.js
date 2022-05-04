"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositExecCaller = void 0;
const ConfigEnv_1 = require("../../config/ConfigEnv");
const Web3EthAbi = require('web3-eth-abi');
class DepositExecCaller {
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
        const contract = manager.getChild();
        //@todo
        const msgEncode = Web3EthAbi.encodeParameters(['uint', 'address', 'address', 'uint256'], [
            msg.rootChainId,
            msg.rootToken,
            msg.receiver,
            msg.value
        ]);
        console.log('Digest: ', verification.msgHash);
        console.log('Deposit data: ', msgEncode);
        console.log('signature: ', verification.signatures);
        contract.methods.depositExecuted(verification.msgHash, msgEncode, verification.signatures)
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
exports.DepositExecCaller = DepositExecCaller;
