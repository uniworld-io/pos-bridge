"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositExecMsg = void 0;
class DepositExecMsg {
    constructor(rootChainId, childChainId, rootToken, depositor, receiver, value) {
        this.rootChainId = rootChainId;
        this.childChainId = childChainId;
        this.rootToken = rootToken;
        this.depositor = depositor;
        this.receiver = receiver;
        this.value = value;
    }
}
exports.DepositExecMsg = DepositExecMsg;
