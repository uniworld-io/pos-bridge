import {ICaller} from "./ICaller";
import {IContractManager} from "../IContractManager";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {CHAIN, TRANSACTION} from "../../config/ConfigEnv";

export class DepositExecCaller implements ICaller {


    call(manager: IContractManager, data: GroupVerification): void {
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
        const contract = manager.getChild() as Contract;
        console.log('GroupVerification: ', verification)
        contract.methods.depositExecuted(verification.msg, verification.signatures)
            .send(TRANSACTION.OPTIONS, (error: any, txHash: any) => {
                if (error)
                    console.error('Error call function contract:', error)
                if (txHash)
                    console.log('TxHash: ', txHash)
            })
    }

    //@todo
    private uniCall(manager: IContractManager, verification: GroupVerification) {

    }

}