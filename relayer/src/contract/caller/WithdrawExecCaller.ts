import {ICaller} from "./ICaller";
import {IContractManager} from "../IContractManager";
import {WithdrawExecMsg} from "../../entity/WithdrawExecMsg";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {CHAIN, TRANSACTION} from "../../config/ConfigEnv";

const Web3EthAbi = require('web3-eth-abi');

export class WithdrawExecCaller implements ICaller {


    call(manager: IContractManager, data: any): void {
        switch (manager.getChainId()) {
            case CHAIN.ETH.ID:
            case CHAIN.BSC.ID:
                this.web3Call(manager, data);
                break
            case CHAIN.UNI.ID:
                this.uniCall(manager, data);
                break
            default:
                throw new Error('Not mapped caller');
        }
    }

    private web3Call(manager: IContractManager, verification: GroupVerification) {
        const msg = verification.msg as WithdrawExecMsg;
        const contract = manager.getRoot() as Contract;

        //@todo
        const msgEncode = Web3EthAbi.encodeParameters(
            ['uint', 'address', 'address', 'bytes'],
            [
                msg.childChainId,
                msg.childToken,
                msg.withdrawer,
                msg.value
            ]);

        contract.methods.withdrawExecuted(verification.msgHash, msgEncode, verification.signatures)
            .send(TRANSACTION.OPTIONS, (error: any, txHash: any) => {
                if(error)
                    console.error('Error call function contract:', error)
                if(txHash)
                    console.log('TxHash: ', txHash)
            })
    }

    //@todo
    private uniCall(manager: IContractManager, verification: GroupVerification) {

    }

}