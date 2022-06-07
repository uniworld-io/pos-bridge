import {UniDepositContract, UniMapToken, UniWithdrawContract} from "../../entity/UniPosBridgeContract";
import {UniSetupPosBridge} from "../../entity/UniPosBridgeContract";
import {poolConnector} from "../../config/PoolConnector";
import {CHAIN} from "../../config/ConfigEnv";
import {GroupVerification} from "../../entity/GroupVerification";
import {PosBridgeService} from "../PosBridgeService";
import {Urc20Burn} from "../../entity/Urc20";

const unichain = poolConnector.uniChainConnector;
const logger = require('../../common/Logger')

export class UniPosBridgeService implements PosBridgeService{

    public async setup(setup: UniSetupPosBridge): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.admin.privateKey;
        setup.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.setup, privateKey, setup);
    }

    public async mapToken(mapToken: UniMapToken): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.admin.privateKey;
        mapToken.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.mapToken, privateKey, mapToken);

    }

    public async unMapToken(mapToken: UniMapToken): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.admin.privateKey;
        mapToken.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.unmapToken, privateKey, mapToken);
    }

    public async deposit(deposit: UniDepositContract): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.account2.privateKey;
        deposit.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.deposit, privateKey, deposit);
    }

    public async withdraw(withdraw: UniWithdrawContract): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.account2.privateKey;
        withdraw.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.withdraw, privateKey, withdraw);
    }

    public async depositExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const depositExec = {
            owner_address: unichain.defaultAddress.hex,
            message: verification.message,
            signatures: verification.signatures
        }
        return this.createTransaction(CHAIN.UNI.DEPOSIT_EXEC_PATH, privateKey, depositExec);
    }

    public async withdrawExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const withdrawExec = {
            owner_address: unichain.defaultAddress.hex,
            message: verification.message,
            signatures: verification.signatures
        }
        return this.createTransaction(CHAIN.UNI.WITHDRAW_EXEC_PATH, privateKey, withdrawExec);
    }


    public async urc20Burn(burner: Urc20Burn): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.admin.privateKey;
        burner.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction("/wallet/urc20burn", privateKey, burner);
    }



    private async createTransaction(path: string, privateKey: string, data: any): Promise<any> {
        try {
            console.log('Before transaction: ', data);
            const unsingedTx = await unichain.currentProviders().fullNode.request(path, data, 'post')
            console.log('UnsingedTx: ', unsingedTx);
            const signedTx = await unichain.unx.signTransaction(unsingedTx, privateKey, 0)
            const result = await unichain.unx.sendRawTransaction(signedTx);
            console.log(result);
            return result;
        } catch (e) {
            logger.error('Failure create transaction to UNI: %s', e)
            return e;
        }

    }

}

export const uniPosBridgeService = new UniPosBridgeService();
