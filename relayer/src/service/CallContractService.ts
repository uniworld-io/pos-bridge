import {BufferEvent} from "../common/BufferEvent";
import {GroupVerification} from "../entity/GroupVerification";
import {Constant} from "../common/Constant";
import {DepositExecMsg} from "../entity/DepositExecMsg";
import {BscContractManager} from "../contract/BscContractManager";
import {EthContractManager} from "../contract/EthContractManager";
import {CHAIN} from "../config/ConfigEnv";
import {IContractManager} from "../contract/IContractManager";
import {ICaller} from "../contract/caller/ICaller";
import {DepositExecCaller} from "../contract/caller/DepositExecCaller";
import {WithdrawExecCaller} from "../contract/caller/WithdrawExecCaller";
import {UniContractManager} from "../contract/UniContractManager";
import {WithdrawExecMsg} from "../entity/WithdrawExecMsg";
import {POOL_CONNECTOR} from '../config/PoolConnector';

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
            console.log("Loop event: ", value)
            const data = value as GroupVerification;

            switch (data.event) {
                case Constant.WITHDRAW_EXEC:
                    this.callWithdrawExec(data);
                    break;
                case Constant.DEPOSIT_EXEC:
                    this.callDepositExec(data);
                    break;
                default:
                    console.log("Not mapped type event")
                    break;
            }
        });
        this.bufferEvent.clear();
    }

    private callDepositExec(verification: GroupVerification): void {
        try{
            const msg = verification.msg as DepositExecMsg;
            const manager = this.chainIdToManager(msg.childChainId) as IContractManager;
            this.depositCaller.call(manager, verification);
        }catch (Error){
            console.log(Error);
        }
    }

    private callWithdrawExec(verification: GroupVerification): void {
        try {
            const msg = verification.msg as WithdrawExecMsg;
            const manager = this.chainIdToManager(msg.rootChainId) as IContractManager;
            this.withdrawCaller.call(manager, verification);
        }catch (Error){
            console.log(Error);
        }
    }

    private chainIdToManager(chainId: number): any {

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