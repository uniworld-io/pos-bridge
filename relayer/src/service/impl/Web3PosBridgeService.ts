import {TRANSACTION} from "../../config/ConfigEnv";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {IContractManager} from "../../contract/IContractManager";
import {PosBridgeService} from "../PosBridgeService";


const logger = require('../../common/Logger');
export class Web3PosBridgeService implements PosBridgeService{

    private manager: IContractManager;

    constructor(manager: IContractManager) {
        this.manager = manager;
    }

    public async depositExec(verification: GroupVerification): Promise<any> {
        const contract = this.manager.getChild() as Contract;
        console.log('GroupVerification: ', verification)
        contract.methods.depositExecuted(verification.msg, verification.signatures)
            .send(TRANSACTION.OPTIONS)
            .then((result: any) => logger.info('Result call: %s', result))
            .catch((error: any) => logger.error('Error call: %s', error))
    }

    public async withdrawExec(verification: GroupVerification): Promise<any> {
        const contract = this.manager.getRoot() as Contract;
        console.log("GroupVerification WithdrawExec: ", verification);
        contract.methods.withdrawExecuted(verification.msg, verification.signatures)
            .send(TRANSACTION.OPTIONS)
            .then((result: any) => logger.info('Result call: %s', result))
            .catch((error: any) => logger.error('Error call: %s', error))
    }


}
