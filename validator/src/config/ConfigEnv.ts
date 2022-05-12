require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import childMngAbi from '../../resource/ChildManagerABI.json';
import rootMngAbi from '../../resource/RootManagerABI.json';

export const CHAIN = {
    ETH: {
        ID: parseInt(process.env.ETH_CHAIN_ID as string),
        EVENT_HOST: process.env.ETH_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        }
    },

    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID as string),
        EVENT_HOST: process.env.BSC_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        }
    },
    UNI: {
        ID: parseInt(process.env.UNI_CHAIN_ID as string),
        EVENT_HOST: process.env.UNI_EVENT_HOST as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.UNI_CHILD_MANAGER_PROXY as string,
            ABI: childMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.UNI_ROOT_MANAGER_PROXY as string,
            ABI: rootMngAbi as any,
            FILTER:{
                fromBlock: 'latest'
            }
        },
        SUBSCRIBE:{
            deposit: 'TokenCreate',
            withdraw: 'TokenCreate',
            path: `/event/native`,
            confirm: true,
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