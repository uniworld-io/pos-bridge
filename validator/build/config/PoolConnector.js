"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL_EVENT_CONNECTOR = void 0;
const web3_1 = __importDefault(require("web3"));
const ConfigEnv_1 = require("./ConfigEnv");
const UniChain = require('@uniworld/unichain-js');
class PoolConnector {
    constructor() {
        const options = {
            reconnect: {
                auto: true,
                delay: 1000,
                // maxAttempts: 5,
                onTimeout: false
            }
        };
        this.ethChainConnector = new web3_1.default(new web3_1.default.providers.WebsocketProvider(ConfigEnv_1.CHAIN.ETH.EVENT_HOST, options));
        this.bscChainConnector = new web3_1.default(new web3_1.default.providers.WebsocketProvider(ConfigEnv_1.CHAIN.BSC.EVENT_HOST, options));
        this.uniChainConnector = new UniChain({ fullHost: ConfigEnv_1.CHAIN.UNI.EVENT_HOST });
    }
}
exports.POOL_EVENT_CONNECTOR = new PoolConnector();
