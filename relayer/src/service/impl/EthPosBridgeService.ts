import {poolConnector} from "../../config/PoolConnector";
import {Web3PosBridgeService} from "./Web3PosBridgeService";
import {EthContractManager} from "../../contract/EthContractManager";

export const ethPosBridgeService = new Web3PosBridgeService(new EthContractManager(poolConnector.ethChainConnector));