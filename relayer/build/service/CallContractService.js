"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallContractService = void 0;
const BufferEvent_1 = require("../common/BufferEvent");
const Constant_1 = require("../common/Constant");
const BscContractManager_1 = require("../contract/BscContractManager");
const EthContractManager_1 = require("../contract/EthContractManager");
const ConfigEnv_1 = require("../config/ConfigEnv");
const DepositExecCaller_1 = require("../contract/caller/DepositExecCaller");
const WithdrawExecCaller_1 = require("../contract/caller/WithdrawExecCaller");
const UniContractManager_1 = require("../contract/UniContractManager");
const PoolConnector_1 = require("../config/PoolConnector");
class CallContractService {
    constructor() {
        this.bufferEvent = BufferEvent_1.BufferEvent.map;
        this.bscManager = new BscContractManager_1.BscContractManager(PoolConnector_1.POOL_CONNECTOR.bscChainConnector);
        this.ethManager = new EthContractManager_1.EthContractManager(PoolConnector_1.POOL_CONNECTOR.ethChainConnector);
        this.uniManager = new UniContractManager_1.UniContractManager(PoolConnector_1.POOL_CONNECTOR.uniChainConnector);
        this.depositCaller = new DepositExecCaller_1.DepositExecCaller();
        this.withdrawCaller = new WithdrawExecCaller_1.WithdrawExecCaller();
    }
    doCallContract() {
        this.bufferEvent.forEach((value, key) => {
            console.log("Loop event: ", value);
            const data = value;
            switch (data.event) {
                case Constant_1.Constant.WITHDRAW_EXEC:
                    this.callWithdrawExec(data);
                    break;
                case Constant_1.Constant.DEPOSIT_EXEC:
                    this.callDepositExec(data);
                    break;
                default:
                    console.log("Not mapped type event");
                    break;
            }
        });
        this.bufferEvent.clear();
    }
    callDepositExec(verification) {
        try {
            const msg = verification.msg;
            console.debug('Call deposit exec: ', msg);
            const manager = this.chainIdToManager(msg.childChainId);
            this.depositCaller.call(manager, verification);
        }
        catch (Error) {
            console.log(Error);
        }
    }
    callWithdrawExec(verification) {
        try {
            const msg = verification.msg;
            console.debug('Call withdraw exec: ', msg);
            const manager = this.chainIdToManager(msg.rootChainId);
            this.withdrawCaller.call(manager, verification);
        }
        catch (Error) {
            console.log(Error);
        }
    }
    chainIdToManager(chainId) {
        console.log('-----------------Map chain-id: ', chainId);
        switch (chainId) {
            case ConfigEnv_1.CHAIN.ETH.ID:
                return this.ethManager;
            case ConfigEnv_1.CHAIN.BSC.ID:
                return this.bscManager;
            case ConfigEnv_1.CHAIN.UNI.ID:
                return this.uniManager;
            default:
                throw new Error('Not mapped chain-id');
        }
    }
}
exports.CallContractService = CallContractService;
