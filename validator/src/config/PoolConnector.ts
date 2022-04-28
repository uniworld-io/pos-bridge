import Web3 from "web3";
import {CHAIN} from "./ConfigEnv";

const UniChain = require('@uniworld/unichain-js');

class PoolConnector{
    //Singleton
    ethChainConnector: Web3;
    bscChainConnector: Web3;
    uniChainConnector: any;

    constructor() {

        this.ethChainConnector = new Web3(new Web3.providers.WebsocketProvider(CHAIN.ETH.EVENT_HOST));
        this.bscChainConnector = new Web3(new Web3.providers.WebsocketProvider(CHAIN.BSC.EVENT_HOST));
        this.uniChainConnector = new UniChain({fullHost: CHAIN.UNI.EVENT_HOST});

        console.log('=============LISTENER EVENT===============');
        console.log('Connection ETH: ', this.ethChainConnector);
        console.log('=========================================');
        console.log('Connection BSC: ', this.bscChainConnector);
        console.log('=========================================');
        console.log('Connection UNI: ', this.uniChainConnector);
    }
}

export const POOL_EVENT_CONNECTOR = new PoolConnector();