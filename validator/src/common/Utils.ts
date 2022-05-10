import EthCrypto from 'eth-crypto';
import {VALIDATOR} from "../config/ConfigEnv";
import {TypedValue} from "eth-crypto";

const logger = require('./Logger');
const Web3EthAbi = require('web3-eth-abi');

export class Utils {

    static getHashKeccak256(typeValue: TypedValue[]): string {
        try {
            return EthCrypto.hash.keccak256(typeValue);
        } catch (e) {
            logger.error("Failure to hash %s, %s", typeValue, e)
            return "";
        }
    }

    static getSignature(messageHash: string): string {
        try {
            const priKey = VALIDATOR.PRIVATE_KEY;
            return EthCrypto.sign(priKey, messageHash);
        } catch (e) {
            logger.error("Failure to sign %s, %s", messageHash, e)
            return "";
        }
    }

    static abiEncode(types: any[], params: any[]): string {
        try {
            return Web3EthAbi.encodeParameters(types, params);
        } catch (e) {
            logger.error("Failure to encode %s - %s, %s", types, params, e)
            return "";
        }
    }
}