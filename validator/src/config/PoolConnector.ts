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
                maxAttempts: 5,
                onTimeout: false
            }
        };

        const bscProvider = new Web3.providers.WebsocketProvider(CHAIN.BSC.EVENT_HOST, options);
        const ethProvider = new Web3.providers.WebsocketProvider(CHAIN.ETH.EVENT_HOST, options);

        this.ethChainConnector = new Web3(ethProvider);
        this.bscChainConnector = new Web3(bscProvider);
        this.uniChainConnector = new UniChain({fullHost: CHAIN.UNI.SEED_NODE});

        // this.onProvider(ethProvider, this.ethChainConnector, CHAIN.ETH.EVENT_HOST);
        // this.onProvider(bscProvider, this.bscChainConnector, CHAIN.BSC.EVENT_HOST);
    }

    private onProvider(provider: any, web3: Web3, wssHost: string){
        provider.on('error', (e: any) => {
            console.error('WS Infura Error', e);
        });

        provider.on('end', (e: any) => {
            console.error('WS closed: ', e);
            console.log('Attempting to reconnect...');
            provider = new Web3.providers.WebsocketProvider(wssHost);
            provider.on('connect', function () {
                console.log('WSS Reconnected');
            });
            web3.setProvider(provider);
        });
    }
}

export const POOL_CONNECTOR = new PoolConnector();
