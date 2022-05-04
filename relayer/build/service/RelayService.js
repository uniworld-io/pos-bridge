"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayService = void 0;
const BufferEvent_1 = require("../common/BufferEvent");
const GroupVerification_1 = require("../entity/GroupVerification");
class RelayService {
    constructor() {
        this.mapDepositEvent = BufferEvent_1.BufferEvent.map;
    }
    bufferEvent(data) {
        const msgHash = data.msgHash;
        if (this.mapDepositEvent.has(msgHash)) {
            const oldData = this.mapDepositEvent.get(msgHash);
            oldData.signatures.push(data.signature);
            this.mapDepositEvent.set(msgHash, oldData);
            console.log("Push event to buffer: ", oldData);
        }
        else {
            const newData = new GroupVerification_1.GroupVerification(data.event, msgHash, data.msg, [data.signature]);
            this.mapDepositEvent.set(msgHash, newData);
            console.log("Push event to buffer: ", newData);
        }
    }
}
exports.RelayService = RelayService;
