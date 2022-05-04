"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const eth_crypto_1 = __importDefault(require("eth-crypto"));
const ConfigEnv_1 = require("../config/ConfigEnv");
class Crypto {
    //@TODO: check prefix
    static getHash(message) {
        return eth_crypto_1.default.hash.keccak256(message);
    }
    //@TODO
    static getSignature(messageHash) {
        const priKey = ConfigEnv_1.VALIDATOR.PRIVATE_KEY;
        return eth_crypto_1.default.sign(priKey, messageHash);
    }
}
exports.Crypto = Crypto;
