import {UniMapToken} from "../../entity/UniMapToken";
import {UniSetupPosBridge} from "../../entity/UniSetupPosBridge";
import {poolConnector} from "../../config/PoolConnector";
import {CHAIN} from "../../config/ConfigEnv";
import {GroupVerification} from "../../entity/GroupVerification";
import {PosBridgeService} from "../PosBridgeService";

const unichain = poolConnector.uniChainConnector;
const logger = require('../../common/Logger')

export class UniPosBridgeService implements PosBridgeService{

    public async setup(setup: UniSetupPosBridge): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.privateKey;
        setup.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.setup, privateKey, setup);
    }

    public async mapToken(mapToken: UniMapToken): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.privateKey;
        mapToken.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.mapToken, privateKey, mapToken);

    }

    public async unMapToken(mapToken: UniMapToken): Promise<any> {
        const privateKey = CHAIN.UNI.TEST.privateKey;
        mapToken.owner_address = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));
        return this.createTransaction(CHAIN.UNI.TEST.paths.unmapToken, privateKey, mapToken);
    }

    public async depositExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const depositExec = {
            owner_address: unichain.defaultAddress.hex,
            message: verification.msg,
            signatures: verification.signatures
        }
        return this.createTransaction(CHAIN.UNI.DEPOSIT_EXEC_PATH, privateKey, depositExec);
    }

    public async withdrawExec(verification: GroupVerification): Promise<any> {
        const privateKey = unichain.defaultPrivateKey;
        const withdrawExec = {
            owner_address: unichain.defaultAddress.hex,
            message: verification.msg,
            signatures: verification.signatures
        }
        return this.createTransaction(CHAIN.UNI.WITHDRAW_EXEC_PATH, privateKey, withdrawExec);
    }



    private async createTransaction(path: string, privateKey: string, data: any): Promise<any> {
        try {
            console.log('Before transaction: ', data);
            const unsingedTx = await unichain.currentProviders().fullNode.request(path, data, 'post')
            const signedTx = await unichain.unx.signTransaction(unsingedTx, privateKey, 0)
            return await unichain.unx.sendRawTransaction(signedTx);
        } catch (e) {
            logger.error('Failure create transaction to UNI: %s', e)
            return null;
        }

    }

}

export const uniPosBridgeService = new UniPosBridgeService();