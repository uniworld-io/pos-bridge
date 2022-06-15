require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import childMngAbi from '../../resource/ChildManagerABI.json';
import ethRootMngAbi from '../../resource/EthRootManagerABI.json';
import bscRootMngAbi from '../../resource/BscRootManagerABI.json';

export const CHAIN = {
    ETH: {
        ID: parseInt(process.env.ETH_CHAIN_ID as string),
        EVENT_HOST: process.env.ETH_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_PROXY as string,
            ABI: ethRootMngAbi as any
        }
    },

    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID as string),
        EVENT_HOST: process.env.BSC_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_PROXY as string,
            ABI: bscRootMngAbi as any,
        }
    },
    UNI: {
        ID: parseInt(process.env.UNI_CHAIN_ID as string),
        EVENT_HOST: process.env.UNI_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.UNI_ROOT_MANAGER_PROXY as string,
            ABI: bscRootMngAbi as any,
        },
        SUBSCRIBE:{
            deposit: process.env.UNI_EVENT_SUBSCRIBE_DEPOSIT_EXEC as string,
            withdraw: process.env.UNI_EVENT_SUBSCRIBE_WITHDRAW_EXEC as string,
            path: `/event/native`,
            confirm:  JSON.parse(process.env.UNI_EVENT_SUBSCRIBE_COMFIRM as string),
            sort: 'timestamp',
            since: Date.now()
        }
    }

}

export const RELAY_APP = {
    HOST: process.env.RELAY_HTTP_HOST as string,
    API:{
        COLLECT_VERIFICATION: process.env.RELAY_API_COLLECT_VERIFICATION as string,
    }
}

export const VALIDATOR = {
    ADDRESS: process.env.VALIDATOR_ADDRESS as string,
    PRIVATE_KEY: process.env.PRIVATE_KEY as string,
}
