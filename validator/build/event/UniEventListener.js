"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniEventListener = void 0;
const ConfigEnv_1 = require("../config/ConfigEnv");
const PoolConnector_1 = require("../config/PoolConnector");
const EventStandardization_1 = require("../entity/EventStandardization");
class UniEventListener {
    constructor(handler) {
        const uniChainConnector = PoolConnector_1.POOL_EVENT_CONNECTOR.uniChainConnector;
        const chain = ConfigEnv_1.CHAIN.UNI;
        this.handler = handler;
        this.rootChainManager = uniChainConnector.contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        this.childChainManager = uniChainConnector.contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);
        console.log("=======================================LISTEN UNI CHAIN=======================================");
        console.log(uniChainConnector.eventServer);
        console.log("=====> ROOT MANAGER CONTRACT:", this.rootChainManager.address);
        console.log("=====> CHILD MANAGER CONTRACT:", this.childChainManager.address);
    }
    listenEventDeposit(filter) {
        this.rootChainManager.DepositExecuted().watch(filter, (error, result) => {
            console.log(result);
            this.handler.handle(EventStandardization_1.EventStandardization.fromUni(result));
        });
    }
    listenEventWithdraw(filter) {
        this.rootChainManager.WithdrawExecuted().watch(filter, (error, result) => {
            console.log(result);
            this.handler.handle(EventStandardization_1.EventStandardization.fromUni(result));
        });
    }
}
exports.UniEventListener = UniEventListener;
