"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATOR = exports.RELAY_APP = exports.CHAIN = void 0;
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const ChildManagerABI_json_1 = __importDefault(require("../resource/ChildManagerABI.json"));
const RootManagerABI_json_1 = __importDefault(require("../resource/RootManagerABI.json"));
exports.CHAIN = {
    ETH: {
        ID: parseInt(process.env.ETH_CHAIN_ID),
        EVENT_HOST: process.env.ETH_EVENT_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        }
    },
    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID),
        EVENT_HOST: process.env.BSC_EVENT_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        }
    },
    UNI: {
        ID: parseInt(process.env.UNI_CHAIN_ID),
        EVENT_HOST: process.env.UNI_EVENT_HOST,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_ADDRESS,
            ABI: ChildManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER: {
            ADDRESS: process.env.UNI_ROOT_MANAGER_ADDRESS,
            ABI: RootManagerABI_json_1.default,
            FILTER: {
                fromBlock: 'latest'
            }
        }
    }
};
exports.RELAY_APP = {
    HOST: process.env.RELAY_HTTP_HOST,
    API: {
        COLLECT_VERIFICATION: process.env.RELAY_API_COLLECT_VERIFICATION,
    }
};
exports.VALIDATOR = {
    ADDRESS: process.env.VALIDATOR_ADDRESS,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
};
