import EthCrypto from 'eth-crypto';
import {VALIDATOR} from "../config/ConfigEnv";

export class Crypto{

    //@TODO: check prefix
    static getHash(message: string): string{
        return EthCrypto.hash.keccak256(message);
    }

    //@TODO
    static getSignature(messageHash: string): string{
        const priKey = VALIDATOR.PRIVATE_KEY;
        return EthCrypto.sign(priKey, messageHash);
    }
}