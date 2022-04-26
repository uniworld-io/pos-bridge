import {BufferEvent} from "../common/BufferEvent";
import {Verification} from "../entity/Verification";
import {GroupVerification} from "../entity/GroupVerification";
import {Constant} from "../common/Constant";
import {DepositExecMsg} from "../entity/DepositExecMsg";
import {WithdrawExecMsg} from "../entity/WithdrawExecMsg";
import {BscContractManager} from "../contract/BscContractManager";
import {EthContractManager} from "../contract/EthContractManager";
import {CHAIN} from "../common/ConfigEnv";
import {IContractManager} from "../contract/IContractManager";
import {Contract} from "web3-eth-contract";

const Web3EthAbi = require('web3-eth-abi');

export class CallContractService {
    private bufferEvent = BufferEvent.map;

    private readonly bscContract: BscContractManager;
    private readonly ethContract: EthContractManager;

    constructor() {
        this.bscContract = new BscContractManager();
        this.ethContract = new EthContractManager();
    }

    doCallContract(): void {
        this.bufferEvent.forEach((key, value) => {
            const data = value as GroupVerification;
            const msg = data.msg as Verification;
            switch (msg.event) {
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

    private callDepositExec(verification: GroupVerification): void {
        const msg = verification.msg as DepositExecMsg;
        const mngContract = this.chainIdToContract(msg.childChainId) as IContractManager;
        const contract = mngContract.getChild() as Contract;

        //@todo
        const msgEncode = Web3EthAbi.encodeParameters(
            ['uint', 'uint', 'address', 'address', 'address', 'uint256'],
            [
                msg.rootChainId,
                msg.childChainId,
                msg.rootToken,
                msg.depositor,
                msg.receiver,
                msg.value
            ]);

        const depositData =  Web3EthAbi.encodeParameters(
            ['bytes32', 'bytes', 'address[]'],
            [verification.msgHash, msgEncode, verification.signatures]
        );

        contract.methods.DepositExecuted(depositData).send;
    }

    private callWithdrawExec(verification: GroupVerification): void {
        const msg = verification.msg as WithdrawExecMsg;
        const mngContract = this.chainIdToContract(msg.rootChainId) as IContractManager;
        const contract = mngContract.getRoot() as Contract;

        //@todo
        const msgEncode = Web3EthAbi.encodeParameters(
            ['uint', 'uint', 'address', 'address', 'address', 'uint256'],
            [
                msg.rootChainId,
                msg.childChainId,
                msg.childToken,
                msg.burner,
                msg.withdrawer,
                msg.value
            ]);

        const withdrawData =  Web3EthAbi.encodeParameters(
            ['bytes32', 'bytes', 'address[]'],
            [verification.msgHash, msgEncode, verification.signatures]
        );

        contract.methods.WithdrawExecuted(withdrawData).send;
    }

    private chainIdToContract(chainId: number): any {
        switch (chainId) {
            case CHAIN.ETH.ID:
                return this.ethContract;
            case CHAIN.BSC.ID:
                return this.bscContract;
            default:
                throw new Error('Not mapped chain-id');
        }
    }

}