require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import childMngAbi from '../resource/ChildManagerABI.json';
import rootMngAbi from '../resource/RootManagerABI.json';


export const CRON_TAB = process.env.CRON_TAB as string | '*/30 * * * * *';

export const API = {
    HOME: '/',
    COLLECT_VERIFICATION: process.env.API_COLLECT_VERIFICATION as string | 'collect-validator',
}

export const SERVER = {
    PORT: process.env.PORT
}

export const WALLET = {
    PRIVATE_KEY: process.env.DEFAULT_WALLET_PRIVATE_KEY as string,
    ACCOUNT: process.env.DEFAULT_WALLET_ACCOUNT as string
}

export const TRANSACTION = {
    OPTIONS: {
        from: WALLET.ACCOUNT,
        gas: 36960,
        gasPrice: 0
    }
}

export const CHAIN = {
    ETH: {
        ID: parseInt(process.env.ETH_CHAIN_ID as string),
        CHAIN_HOST: process.env.ETH_CHAIN_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_ADDRESS as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS as string,
            ABI: rootMngAbi as any
        }
    },

    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID as string),
        CHAIN_HOST: process.env.BSC_CHAIN_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS as string,
            ABI: rootMngAbi as any
        }
    },

    UNI: {
        ID: parseInt(process.env.UNI_CHAIN_ID as string),
        CHAIN_HOST: process.env.UNI_CHAIN_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_ADDRESS as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.UNI_ROOT_MANAGER_ADDRESS as string,
            ABI: rootMngAbi as any
        }
    }
}