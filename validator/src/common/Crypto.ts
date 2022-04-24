import EthCrypto from 'eth-crypto';

export class Crypto{

    //@TODO: add prefix
    static getHash(message: string): string{
        return EthCrypto.hash.keccak256(message);
    }

    //@TODO
    static getSignature(messageHash: string): string{
        const priKey = process.env.PRIVATE_KEY as string;
        return EthCrypto.sign(priKey, messageHash);
    }
}
