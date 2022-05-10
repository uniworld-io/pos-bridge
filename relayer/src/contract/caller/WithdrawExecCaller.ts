import {ICaller} from "./ICaller";
import {IContractManager} from "../IContractManager";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {CHAIN, TRANSACTION} from "../../config/ConfigEnv";
const logger = require('../../common/Logger')
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
        const contract = manager.getRoot() as Contract;
        console.log("GroupVerification WithdrawExec: ", verification);
        contract.methods.withdrawExecuted(verification.msg, verification.signatures)
            .send(TRANSACTION.OPTIONS)
            .then((result: any) => logger.info('Result call: %s', result))
            .catch((error: any) => logger.error('Error call: %s', error))
    }

    //@todo
    private uniCall(manager: IContractManager, verification: GroupVerification) {

    }

}