import {RELAYER} from "../../config/ConfigEnv";
import {Contract} from "web3-eth-contract";
import {GroupVerification} from "../../entity/GroupVerification";
import {IContractManager} from "../../contract/IContractManager";
import {PosBridgeService} from "../PosBridgeService";
import Web3 from "web3";


const logger = require('../../common/Logger');

export class Web3PosBridgeService implements PosBridgeService {

    private manager: IContractManager;

    constructor(manager: IContractManager) {
        this.manager = manager;
    }

    public async depositExec(verification: GroupVerification): Promise<any> {
        const contract = this.manager.getChild() as Contract;
        console.log('GroupVerification: ', verification)

        const depositExecutedCall = contract.methods.depositExecuted(verification.message, verification.signatures);

        depositExecutedCall
            .send(await this.options(depositExecutedCall))
            .then((result: any) => logger.info('Result call: %s', result))
            .catch((error: any) => logger.error('Error call: %s', error))
    }

    public async withdrawExec(verification: GroupVerification): Promise<any> {
        const contract = await this.manager.getRoot() as Contract;
        console.log("GroupVerification WithdrawExec: ", verification);

        const withdrawExecutedCall = contract.methods.withdrawExecuted(verification.message, verification.signatures);

        withdrawExecutedCall
            .send(await this.options(withdrawExecutedCall))
            .then((result: any) => logger.info('Result call: %s', result))
            .catch((error: any) => logger.error('Error call: %s', error))
    }

    private async options(functionCall: any): Promise<any>{
        const gasOfFunction = await functionCall.estimateGas({from: RELAYER.ACCOUNT});
        const latestBlock: any = await this.manager.getConnector().eth.getBlock('latest');
        const gasPriceAvg = await this.manager.getConnector().eth.getGasPrice();

        console.log('Estimate Gas: ', gasOfFunction);
        console.log('GasLimit of block: ', latestBlock.gasLimit);
        console.log('GasPrice AVG: ', gasPriceAvg);

        return {
            from: RELAYER.ACCOUNT,
            gas: gasOfFunction ,
            gasPrice: gasPriceAvg
        }
    }

}
