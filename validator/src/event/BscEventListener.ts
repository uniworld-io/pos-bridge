import {Web3EventListener} from "./Web3EventListener";
import {IContractEventHandler} from "../hander/IContractEventHandler";

import {POOL_EVENT_CONNECTOR} from "../config/PoolConnector";
import {CHAIN} from "../config/ConfigEnv";

const _ = require('lodash');

export class BscEventListener extends  Web3EventListener{

    constructor(handler: IContractEventHandler) {
        const chain = CHAIN.BSC;
        const chainConnector = POOL_EVENT_CONNECTOR.bscChainConnector;

        const rootChainManager = new chainConnector.eth.Contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        const childChainManager = new chainConnector.eth.Contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);
        super(handler, rootChainManager, childChainManager);
    }

}