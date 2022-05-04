"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN = exports.TRANSACTION = exports.WALLET = exports.SERVER = exports.API = exports.CRON_TAB = void 0;
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const ChildManagerABI_json_1 = __importDefault(require("../resource/ChildManagerABI.json"));
const RootManagerABI_json_1 = __importDefault(require("../resource/RootManagerABI.json"));
exports.CRON_TAB = process.env.CRON_TAB;
exports.API = {
    HOME: '/',
    COLLECT_VERIFICATION: process.env.API_COLLECT_VERIFICATION,
};
exports.SERVER = {
    PORT: process.env.PORT
};
exports.WALLET = {
    PRIVATE_KEY: process.env.DEFAULT_WALLET_PRIVATE_KEY,
    ACCOUNT: process.env.DEFAULT_WALLET_ACCOUNT
};
exports.TRANSACTION = {
    OPTIONS: {
        from: exports.WALLET.ACCOUNT,
        gas: 36960,
        gasPrice: 0
    }
};
exports.CHAIN = {
    ETH: {
        ID: Number(process.env.ETH_CHAIN_ID),
        CHAIN_HOST: process.env.ETH_CHAIN_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default
        }
    },
    BSC: {
        ID: Number(process.env.BSC_CHAIN_ID),
        CHAIN_HOST: process.env.BSC_CHAIN_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default
        }
    },
    UNI: {
        ID: Number(process.env.UNI_CHAIN_ID),
        CHAIN_HOST: process.env.UNI_CHAIN_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.UNI_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default
        }
    }
};
