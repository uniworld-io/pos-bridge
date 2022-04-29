import {EventListenerImpl} from "./EventListenerImpl";
import {IContractEventHandler} from "../hander/IContractEventHandler";

import {POOL_EVENT_CONNECTOR} from "../config/PoolConnector";
import {CHAIN} from "../config/ConfigEnv";

const _ = require('lodash');

export class EthEventListener extends EventListenerImpl{

    constructor(handler: IContractEventHandler) {
        const chain = CHAIN.ETH;
        const chainConnector = POOL_EVENT_CONNECTOR.ethChainConnector;
        const rootChainManager = new chainConnector.eth.Contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        const childChainManager = new chainConnector.eth.Contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);

        super(handler, rootChainManager, childChainManager);

        console.log("=======================================LISTEN ETH CHAIN=======================================");
        console.log(chainConnector.eth.currentProvider)
        console.log("=====> ROOT MANAGER CONTRACT:", chain.ROOT_MANAGER.ADDRESS)
        console.log("=====> CHILD MANAGER CONTRACT:", chain.CHILD_MANAGER.ADDRESS)
    }

}