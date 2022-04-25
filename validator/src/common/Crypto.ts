import EthCrypto from 'eth-crypto';
import {VALIDATOR} from "./ConfigEnv";

export class Crypto{

    //@TODO: add prefix
    static getHash(message: string): string{
        return EthCrypto.hash.keccak256(message);
    }

    //@TODO
    static getSignature(messageHash: string): string{
        const priKey = VALIDATOR.PRIVATE_KEY;
        return EthCrypto.sign(priKey, messageHash);
    }
}
