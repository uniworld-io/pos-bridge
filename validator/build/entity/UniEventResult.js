"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniEventResult = void 0;
class UniEventResult {
    constructor(block, timestamp, contract, name, transaction, result, resourceNode, unconfirmed, fingerprint) {
        this.block = block;
        this.timestamp = timestamp;
        this.contract = contract;
        this.name = name;
        this.transaction = transaction;
        this.result = result;
        this.resourceNode = resourceNode;
        this.unconfirmed = unconfirmed;
        this.fingerprint = fingerprint;
    }
}
exports.UniEventResult = UniEventResult;
