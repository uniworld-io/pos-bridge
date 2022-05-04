"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawExecMsg = void 0;
class WithdrawExecMsg {
    constructor(childChainId, rootChainId, childToken, burner, withdrawer, value) {
        this.childChainId = childChainId;
        this.rootChainId = rootChainId;
        this.childToken = childToken;
        this.burner = burner;
        this.withdrawer = withdrawer;
        this.value = value;
    }
}
exports.WithdrawExecMsg = WithdrawExecMsg;
