require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export const API = {
    HOME: '/',
    COLLECT_VALIDATOR: process.env.COLLECT_VALIDATOR as string | 'collect-validator',
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
            ABI: require('../resource/EthChildManagerABI.json')
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS as string,
            ABI: require('../resource/EthRootManagerABI.json')
        }
    },

    BSC: {
        ID: parseInt(process.env.BSC_CHAIN_ID as string),
        SERVER_ADDRESS: process.env.BSC_RPC_ADDRESS as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS as string,
            ABI: require('../resource/BscChildManagerABI.json')
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS as string,
            ABI: require('../resource/BscRootManagerABI.json')
        }
    }
}