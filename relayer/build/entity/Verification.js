"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
class Verification {
    constructor(validator, msgHash, msg, signature, event) {
        this.validator = validator;
        this.msgHash = msgHash;
        this.msg = msg;
        this.signature = signature;
        this.event = event;
    }
    toJSON() {
        return {
            validator: this.validator,
            msgHash: this.msgHash,
            msg: this.msg,
            signature: this.signature
        };
    }
}
exports.Verification = Verification;
