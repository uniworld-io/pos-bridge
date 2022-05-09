import EthCrypto from 'eth-crypto';
import {VALIDATOR} from "../config/ConfigEnv";
export class Crypto{

    static getSignature(messageHash: string): string{
        const priKey = VALIDATOR.PRIVATE_KEY;
        return EthCrypto.sign(priKey, messageHash);
    }
}
