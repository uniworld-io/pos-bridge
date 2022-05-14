import {BscContractManager} from "../../contract/BscContractManager";
import {poolConnector} from "../../config/PoolConnector";
import {Web3PosBridgeService} from "./Web3PosBridgeService";

export const bscPosBridgeService = new Web3PosBridgeService(new BscContractManager(poolConnector.bscChainConnector));