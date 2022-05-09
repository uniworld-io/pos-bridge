import Web3 from "web3";
import {CHAIN, RELAYER} from "./ConfigEnv";

const UniChain = require('@uniworld/unichain-js');

class PoolConnector{
    //Singleton
    ethChainConnector: Web3;
    bscChainConnector: Web3;
    uniChainConnector: any;

    constructor() {
        this.ethChainConnector = new Web3(new Web3.providers.HttpProvider(CHAIN.ETH.CHAIN_HOST));
        this.ethChainConnector.eth.accounts.wallet.add(RELAYER.PRIVATE_KEY);

        this.bscChainConnector = new Web3(new Web3.providers.HttpProvider(CHAIN.BSC.CHAIN_HOST));
        this.bscChainConnector.eth.accounts.wallet.add(RELAYER.PRIVATE_KEY);

        this.uniChainConnector = new UniChain({fullHost: CHAIN.UNI.CHAIN_HOST});

        console.log('=============LISTENER EVENT===============');
        console.log('Connection ETH: ', this.ethChainConnector);
        console.log('=========================================');
        console.log('Connection BSC: ', this.bscChainConnector);
        console.log('=========================================');
        console.log('Connection UNI: ', this.uniChainConnector);
    }
}

export const POOL_CONNECTOR = new PoolConnector();