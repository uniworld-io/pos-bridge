import {BufferEvent} from "../common/BufferEvent";
import {ValidatorMsgData} from "../entity/ValidatorMsgData";
import {DataSignatures} from "../entity/DataSignatures";
import {Constant} from "../common/Constant";
import {DepositExecMsg} from "../entity/DepositExecMsg";
import {WithdrawExecMsg} from "../entity/WithdrawExecMsg";
import {BscContractManager} from "../contract/BscContractManager";
import {EthContractManager} from "../contract/EthContractManager";
import {CHAIN} from "../common/ConfigEnv";
import {IContractManager} from "../contract/IContractManager";
import {Contract} from "web3-eth-contract";

export class CallContractService{
    private bufferEvent = BufferEvent.map;

    private bscContract: BscContractManager;
    private ethContract: EthContractManager;

    constructor() {
        this.bscContract = new BscContractManager();
        this.ethContract = new EthContractManager();
    }

    runCallContract(): void{
        this.bufferEvent.forEach((key, value) => {
            const data = value as DataSignatures;
            const msg = data.msg as ValidatorMsgData;
            switch (msg.event){
                case Constant.WITHDRAW_EVENT:
                    this.callWithdrawExec(data);
                    break;
                case Constant.DEPOSIT_EVENT:
                    this.callDepositExec(data);
                    break;
                default:
                    console.log("Not mapped type event")
                    break;
            }
        });
    }

    callDepositExec(callData: DataSignatures):void{
        const msg = callData.msg as DepositExecMsg;
        const mngContract = this.chainIdToContract(msg.childChainId) as IContractManager;
        const contract = mngContract.getChild() as Contract;
        contract.methods.depositExecuted(
            //@TODO
        ).send;
    }

    callWithdrawExec(callData: DataSignatures): void{
        const msg = callData.msg as WithdrawExecMsg;
        const mngContract = this.chainIdToContract(msg.rootChainId) as IContractManager;
        const contract = mngContract.getRoot() as Contract;
        contract.methods.withdrawExecuted(
            //@TODO
        ).send;
    }

    private chainIdToContract(chainId: number): any{
        switch (chainId){
            case CHAIN.ETH.ID:
                return this.ethContract;
            case CHAIN.BSC.ID:
                return this.bscContract;
            default:
                throw new Error('Not mapped chain-id');
        }
    }

}