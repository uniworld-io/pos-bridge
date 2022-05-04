"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthContractManager = void 0;
const ConfigEnv_1 = require("../config/ConfigEnv");
const ETH = ConfigEnv_1.CHAIN.ETH;
class EthContractManager {
    constructor(connector) {
        this.connector = connector;
        const childMng = ETH.CHILD_MANAGER;
        this.childMngContract = new connector.eth.Contract(childMng.ABI, childMng.ADDRESS);
        const rootMng = ETH.ROOT_MANAGER;
        this.rootMngContract = new connector.eth.Contract(rootMng.ABI, rootMng.ADDRESS);
    }
    getChild() {
        return this.childMngContract;
    }
    getRoot() {
        return this.rootMngContract;
    }
    getChainId() {
        return ETH.ID;
    }
    getConnector() {
        return this.connector;
    }
}
exports.EthContractManager = EthContractManager;
