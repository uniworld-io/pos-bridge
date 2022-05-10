import {BufferEvent} from "../common/BufferEvent";
import {GroupVerification} from "../entity/GroupVerification";
import {Constant} from "../common/Constant";
import {BscContractManager} from "../contract/BscContractManager";
import {EthContractManager} from "../contract/EthContractManager";
import {CHAIN} from "../config/ConfigEnv";
import {IContractManager} from "../contract/IContractManager";
import {ICaller} from "../contract/caller/ICaller";
import {DepositExecCaller} from "../contract/caller/DepositExecCaller";
import {WithdrawExecCaller} from "../contract/caller/WithdrawExecCaller";
import {UniContractManager} from "../contract/UniContractManager";
import {POOL_CONNECTOR} from '../config/PoolConnector';
const logger = require('../common/Logger')
export class CallContractService {
    private bufferEvent = BufferEvent.map;

    private readonly bscManager: BscContractManager;
    private readonly ethManager: EthContractManager;
    private readonly uniManager: UniContractManager;

    private readonly depositCaller: ICaller;
    private readonly withdrawCaller: ICaller;

    constructor() {
        this.bscManager = new BscContractManager(POOL_CONNECTOR.bscChainConnector);
        this.ethManager = new EthContractManager(POOL_CONNECTOR.ethChainConnector);
        this.uniManager = new UniContractManager(POOL_CONNECTOR.uniChainConnector);

        this.depositCaller = new DepositExecCaller();
        this.withdrawCaller = new WithdrawExecCaller();
    }

    doCallContract(): void {
        this.bufferEvent.forEach((value, key) => {
            try{
                console.log("Loop event: ", value)
                const verification = value as GroupVerification;
                const manager = this.chainIdToManager(verification.toChainId) as IContractManager;
                let caller;

                switch (verification.event) {
                    case Constant.WITHDRAW_EXEC:
                        caller = this.withdrawCaller;
                        break;
                    case Constant.DEPOSIT_EXEC:
                        caller = this.depositCaller;
                        break;
                    default:
                        logger.error("Not mapped type event: %s", verification.event)
                        return
                }
                caller.call(manager, verification);
            }catch (e){
                logger.error("Failure to call contract: %s, %s", value, e)
            }
        });
        this.bufferEvent.clear();
    }

    private chainIdToManager(chainId: number): any {
        console.log('-----------------Map chain-id: ', chainId);
        switch (chainId) {
            case CHAIN.ETH.ID:
                return this.ethManager;
            case CHAIN.BSC.ID:
                return this.bscManager;
            case CHAIN.UNI.ID:
                return this.uniManager;
            default:
                throw new Error('Not mapped chain-id');
        }
    }

}