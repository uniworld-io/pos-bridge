"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStandardization = void 0;
class EventStandardization {
    constructor(txHash, blockNumber, contract, values, eventName) {
        this.txHash = txHash;
        this.blockNumber = blockNumber;
        this.contract = contract;
        this.values = values;
        this.eventName = eventName;
    }
    static from(data) {
        return new EventStandardization(data.transactionHash, data.blockNumber, data.address, data.returnValues, data.event);
    }
    static fromUni(data) {
        return new EventStandardization(data.transaction, data.block, data.contract, data.result, data.name);
    }
}
exports.EventStandardization = EventStandardization;
