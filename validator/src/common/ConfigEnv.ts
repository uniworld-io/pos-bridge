require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import ethChildMngAbi from '../resource/EthChildManagerABI.json';
import ethRootMngAbi from '../resource/EthRootManagerABI.json';
import bscChildMngAbi from '../resource/BscChildManagerABI.json';
import bscRootMngAbi from '../resource/BscRootManagerABI.json';


export const CHAIN = {
    ETH: {
        ID: parseInt(process.env.ETH_CHAIN_ID as string),
        SERVER_ADDRESS: process.env.ETH_RPC_SERVER as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_ADDRESS as string,
            ABI: ethChildMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS as string,
            ABI: ethRootMngAbi as any
        }
    },

    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID as string),
        SERVER_ADDRESS: process.env.BSC_RPC_ADDRESS as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS as string,
            ABI: bscChildMngAbi as any
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS as string,
            ABI: bscRootMngAbi as any
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
    PRIVATE_KEY: process.env.PRIVATE_KEY as string
}