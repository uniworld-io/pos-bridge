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
    ACCOUNT: process.env.RELAYER_ADDRESS as string,
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
            admin: {
                privateKey: '966acb704ec6a830e0a8acc91cb0ac943b0a90f0f72cbc2c42966a3872a9cdf0',
                address: ''
            },
            account1:{
                privateKey: 'c2e18d816b025f333ed25f6be1566cfd3b401a69e2e409a7456e900665eb62e3',
                address: '0x1eABA7D736f85D723730f71c2D9322c1c82be0eB'
            },
            account2:{
                privateKey: '2746e2d905ffaa2d27cbb3f8786bc6a187f0765dc37e9993a6499e6b650a1e07',
                address: '0x4B58913337d93BE4755072E3d0F45Ca942E11751'
            },
            paths: {
                setup: '/wallet/posbridgesetup',
                deposit: '/wallet/posbridgedeposit',
                withdraw: '/wallet/posbridgewithdraw',
                mapToken: '/wallet/posbridgemaptoken',
                unmapToken: '/wallet/posbridgecleanmaptoken',
            }
        }
    }
}