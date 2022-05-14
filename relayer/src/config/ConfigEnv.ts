require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import childMngAbi from '../../resource/ChildManagerABI.json';
import rootMngAbi from '../../resource/RootManagerABI.json';


export const CRON_TAB = process.env.CRON_TAB as string | '*/30 * * * * *';

export const API = {
    HOME: '/',
    COLLECT_VERIFICATION: process.env.API_COLLECT_VERIFICATION as string | 'collect-validator',
}

export const SERVER = {
    PORT: process.env.PORT
}

export const RELAYER = {
    PRIVATE_KEY: process.env.RELAYER_PRIVATE_KEY as string,
    ACCOUNT: process.env.RELAYER_ADDRESS as string
}

export const TRANSACTION = {
    OPTIONS: {
        from: RELAYER.ACCOUNT,
        gas: 3000000,
        gasPrice: 0
    }
}

export const CHAIN = {
    ETH: {
        ID: Number(process.env.ETH_CHAIN_ID),
        CHAIN_HOST: process.env.ETH_CHAIN_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any
        }
    },

    BSC: {
        ID: Number(process.env.BSC_CHAIN_ID),
        CHAIN_HOST: process.env.BSC_CHAIN_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any
        }
    },

    UNI: {
        ID: Number(process.env.UNI_CHAIN_ID),
        CHAIN_HOST: process.env.UNI_CHAIN_HOST as string,
        CHAIN_RELAY: process.env.UNI_CHAIN_RELAY as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.UNI_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any
        },
        DEPOSIT_EXEC_PATH: '/wallet/posbridgedepositexec',
        WITHDRAW_EXEC_PATH: '/wallet/posbridgewithdrawexec',

        TEST:{
            privateKey: '966acb704ec6a830e0a8acc91cb0ac943b0a90f0f72cbc2c42966a3872a9cdf0',
            paths: {
                setup: '/wallet/posbridgesetup',
                deposit: '/wallet/posbridgedeposit',
                withdraw: '/wallet/posbridgewithdraw',
                mapToken: '/wallet/posbridgemaptoken',
                unmapToken: '/wallet/posbridgeunmaptoken',
            }
        }
    }
}