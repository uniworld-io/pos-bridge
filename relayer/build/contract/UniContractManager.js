"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniContractManager = void 0;
const ConfigEnv_1 = require("../config/ConfigEnv");
const UNI = ConfigEnv_1.CHAIN.UNI;
class UniContractManager {
    constructor(connector) {
        this.connector = connector;
        const childMng = UNI.CHILD_MANAGER;
        this.childMngContract = connector.contract(childMng.ABI, childMng.ADDRESS);
        const rootMng = UNI.ROOT_MANAGER;
        this.rootMngContract = connector.contract(rootMng.ABI, rootMng.ADDRESS);
    }
    getChainId() {
        return ConfigEnv_1.CHAIN.UNI.ID;
    }
    getChild() {
        return this.childMngContract;
    }
    getRoot() {
        return this.rootMngContract;
    }
    getConnector() {
        return this.connector;
    }
}
exports.UniContractManager = UniContractManager;
