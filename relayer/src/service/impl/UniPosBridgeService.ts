import {UniDepositContract, UniSetupPosBridge, UniWithdrawContract} from "../../entity/UniPosBridgeContract";
import {poolConnector} from "../../config/PoolConnector";
import {CHAIN} from "../../config/ConfigEnv";
import {GroupVerification} from "../../entity/GroupVerification";
import {PosBridgeService} from "../PosBridgeService";

const unichain = poolConnector.uniChainConnector;
const logger = require('../../common/Logger')

export class UniPosBridgeService implements PosBridgeService{

    public async setup(setup: UniSetupPosBridge): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.admin.privateKey;
        setup.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.setup, privateKey, setup);
    }


    public async deposit(deposit: UniDepositContract): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.account2.privateKey;
        deposit.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));

        const tx = await unichain.transactionBuilder.posBridgeDeposit(
            deposit.owner_address,
            deposit.root_token,
            deposit.child_chainid,
            deposit.receive_address,
            deposit.data);
        const signedTx = await unichain.unx.signTransaction(tx, privateKey, 0)
        const result = await unichain.unx.sendRawTransaction(signedTx);
        console.log(result);
    }

    public async withdraw(withdraw: UniWithdrawContract): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.account2.privateKey;
        const owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        const tx = await unichain.transactionBuilder.posBridgeWithdraw(owner_address, withdraw.child_token, withdraw.receive_address, withdraw.data);
        const signedTx = await unichain.unx.signTransaction(tx, privateKey, 0)
        return await unichain.unx.sendRawTransaction(signedTx);
    }

    public async depositExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const tx = await unichain.transactionBuilder.posBridgeDepositExec(unichain.defaultAddress.base58, verification.signatures, verification.message);
        const signedTx = await unichain.unx.signTransaction(tx, privateKey, 0)
        return await unichain.unx.sendRawTransaction(signedTx);
    }

    public async withdrawExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const tx = await unichain.transactionBuilder.posBridgeWithdraw(unichain.defaultAddress.base58, verification.signatures, verification.message);
        const signedTx = await unichain.unx.signTransaction(tx, privateKey, 0)
        return await unichain.unx.sendRawTransaction(signedTx);
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
