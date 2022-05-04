"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupVerification = void 0;
class GroupVerification {
    constructor(event, msgHash, msg, signatures) {
        this.event = event;
        this.msgHash = msgHash;
        this.msg = msg;
        this.signatures = signatures;
    }
}
exports.GroupVerification = GroupVerification;
