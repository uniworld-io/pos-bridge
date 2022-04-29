import Web3 from "web3";
import {CHAIN} from "./ConfigEnv";

const UniChain = require('@uniworld/unichain-js');

class PoolConnector{
    //Singleton
    ethChainConnector: Web3;
    bscChainConnector: Web3;
    uniChainConnector: any;

    constructor() {
        const options = {
            reconnect: {
                auto: true,
                delay: 1000, // ms
                // maxAttempts: 5,
                onTimeout: false
            }
        };

        this.ethChainConnector = new Web3(new Web3.providers.WebsocketProvider(CHAIN.ETH.EVENT_HOST, options));
        this.bscChainConnector = new Web3(new Web3.providers.WebsocketProvider(CHAIN.BSC.EVENT_HOST, options));
        this.uniChainConnector = new UniChain({fullHost: CHAIN.UNI.EVENT_HOST});
    }
}

export const POOL_EVENT_CONNECTOR = new PoolConnector();