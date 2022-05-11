import {ICaller} from "./ICaller";
import {IContractManager} from "../IContractManager";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {CHAIN, RELAYER, TRANSACTION} from "../../config/ConfigEnv";
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

    private async uniCall(manager: IContractManager, verification: GroupVerification) {
        const unichain = manager.getConnector();
        const data = {
            owner_address: RELAYER.ACCOUNT,
            message: verification.msg,
            signatures: verification.signatures
        }
        const unsingedTx = await unichain.currentProviders().fullNode
            .request(CHAIN.UNI.WITHDRAW_EXEC_PATH, data, 'post')
        const signedTx = await unichain.unx.signTransaction(unsingedTx, RELAYER.PRIVATE_KEY, 0)
        const res = await unichain.unx.sendRawTransaction(signedTx)
        logger.info(res)
    }

}