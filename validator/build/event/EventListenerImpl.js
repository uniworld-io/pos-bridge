"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerImpl = void 0;
const EventStandardization_1 = require("../entity/EventStandardization");
class EventListenerImpl {
    constructor(handler, rootChainManager, childChainManager) {
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
            console.log('CaptureEvent: ', result);
            this.handler.handle(EventStandardization_1.EventStandardization.from(result));
        });
        events.on('changed', (changed) => console.log('Changed event: ', changed));
        events.on('error', (err) => console.log('Error event: ', err.message, err.stack));
        events.on('connected', (str) => console.log('Connected event: ', str));
    }
}
exports.EventListenerImpl = EventListenerImpl;
