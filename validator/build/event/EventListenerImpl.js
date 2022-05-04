"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerImpl = void 0;
const EventStandardization_1 = require("../entity/EventStandardization");
const logger = require('../common/Logger');
class EventListenerImpl {
    constructor(chainId, handler, rootChainManager, childChainManager) {
        this.chainId = chainId;
        this.rootChainManager = rootChainManager;
        this.childChainManager = childChainManager;
        this.handler = handler;
    }
    listenEventDeposit(filter) {
        const events = this.rootChainManager.events.DepositExecuted();
        this.listen(events);
    }
    listenEventWithdraw(filter) {
        const events = this.childChainManager.events.WithdrawExecuted();
        this.listen(events);
    }
    listen(events) {
        events.on('data', (result) => {
            logger.info('CaptureEvent: %s', result);
            this.handler.handle(EventStandardization_1.EventStandardization.from(result));
        });
        events.on('changed', (changed) => console.log('Changed event: ', changed));
        events.on('error', (err) => logger.error('Error event from chain-id %s: %s, %s', this.chainId, err.message, err.stack));
        events.on('connected', (str) => console.log('Connected event: ', str));
    }
}
exports.EventListenerImpl = EventListenerImpl;
