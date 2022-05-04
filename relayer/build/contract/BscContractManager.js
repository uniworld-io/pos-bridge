"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscContractManager = void 0;
const ConfigEnv_1 = require("../config/ConfigEnv");
const BSC = ConfigEnv_1.CHAIN.BSC;
class BscContractManager {
    constructor(connector) {
        this.connector = connector;
        connector.eth.accounts.wallet.add('23e2eae41fca0f33e0fd3c1b901b1b114e75af8664fc6d88f18e48153a67aae0');
        const childMng = BSC.CHILD_MANAGER;
        this.childMngContract = new connector.eth.Contract(childMng.ABI, childMng.ADDRESS);
        const rootMng = BSC.ROOT_MANAGER;
        this.rootMngContract = new connector.eth.Contract(rootMng.ABI, rootMng.ADDRESS);
    }
    getChild() {
        return this.childMngContract;
    }
    getRoot() {
        return this.rootMngContract;
    }
    getChainId() {
        return BSC.ID;
    }
    getConnector() {
        return this.connector;
    }
}
exports.BscContractManager = BscContractManager;
