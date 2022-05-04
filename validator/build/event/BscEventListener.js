"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscEventListener = void 0;
const EventListenerImpl_1 = require("./EventListenerImpl");
const PoolConnector_1 = require("../config/PoolConnector");
const ConfigEnv_1 = require("../config/ConfigEnv");
const _ = require('lodash');
class BscEventListener extends EventListenerImpl_1.EventListenerImpl {
    constructor(handler) {
        const chain = ConfigEnv_1.CHAIN.BSC;
        const chainConnector = PoolConnector_1.POOL_EVENT_CONNECTOR.bscChainConnector;
        const rootChainManager = new chainConnector.eth.Contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        const childChainManager = new chainConnector.eth.Contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);
        super(handler, rootChainManager, childChainManager);
        console.log("=======================================LISTEN BSC CHAIN=======================================");
        console.log(chainConnector.eth.currentProvider);
        console.log("=====> ROOT MANAGER CONTRACT:", chain.ROOT_MANAGER.ADDRESS);
        console.log("=====> CHILD MANAGER CONTRACT:", chain.CHILD_MANAGER.ADDRESS);
    }
}
exports.BscEventListener = BscEventListener;
