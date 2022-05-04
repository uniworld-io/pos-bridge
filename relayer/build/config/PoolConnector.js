"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL_CONNECTOR = void 0;
const web3_1 = __importDefault(require("web3"));
const ConfigEnv_1 = require("./ConfigEnv");
const UniChain = require('@uniworld/unichain-js');
class PoolConnector {
    constructor() {
        this.ethChainConnector = new web3_1.default(new web3_1.default.providers.HttpProvider(ConfigEnv_1.CHAIN.ETH.CHAIN_HOST));
        this.ethChainConnector.eth.accounts.wallet.add(ConfigEnv_1.WALLET.PRIVATE_KEY);
        this.bscChainConnector = new web3_1.default(new web3_1.default.providers.HttpProvider(ConfigEnv_1.CHAIN.BSC.CHAIN_HOST));
        this.bscChainConnector.eth.accounts.wallet.add(ConfigEnv_1.WALLET.PRIVATE_KEY);
        this.uniChainConnector = new UniChain({ fullHost: ConfigEnv_1.CHAIN.UNI.CHAIN_HOST });
        console.log('=============LISTENER EVENT===============');
        console.log('Connection ETH: ', this.ethChainConnector);
        console.log('=========================================');
        console.log('Connection BSC: ', this.bscChainConnector);
        console.log('=========================================');
        console.log('Connection UNI: ', this.uniChainConnector);
    }
}
exports.POOL_CONNECTOR = new PoolConnector();
