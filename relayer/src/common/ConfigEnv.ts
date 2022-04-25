require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

import ethChildMngAbi from '../resource/EthChildManagerABI.json';
import ethRootMngAbi from '../resource/EthRootManagerABI.json';
import bscChildMngAbi from '../resource/BscChildManagerABI.json';
import bscRootMngAbi from '../resource/BscRootManagerABI.json';



export const API = {
    HOME: '/',
    COLLECT_VERIFICATION: process.env.API_COLLECT_VERIFICATION as string | 'collect-validator',
}

export const SERVER = {
    PORT: process.env.PORT
}


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