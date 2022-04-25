require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export const CHAIN = {
    ETH: {
        ID: process.env.ETH_CHAIN_ID,
        SERVER_ADDRESS: process.env.ETH_RPC_SERVER as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.ETH_CHILD_MANAGER_ADDRESS as string,
            ABI: require('../resource/ChildTokenAbi.json')
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.ETH_ROOT_MANAGER_ADDRESS as string,
            ABI: require('../resource/RootTokenAbi.json')
        }
    },

    BSC: {
        ID: process.env.BSC_CHAIN_ID,
        SERVER_ADDRESS: process.env.BSC_RPC_ADDRESS as string,
        CHILD_MANAGER: {
            ADDRESS: process.env.BSC_CHILD_MANAGER_ADDRESS as string,
            ABI: require('../resource/ChildTokenAbi.json')
        },
        ROOT_MANAGER:{
            ADDRESS: process.env.BSC_ROOT_MANAGER_ADDRESS as string,
            ABI: require('../resource/RootTokenAbi.json')
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