const fs = require('fs')

module.exports = {

    consensusRate: process.env.CONSENSUS_RATE,
    minValidators: process.env.MIN_VALIDATOR,
    validators: JSON.parse(process.env.VALIDATORS),
    bsc: {
        chain_id: process.env.BSC_CHAIN_ID
    },
    uni: {
        chain_id: process.env.UNI_CHAIN_ID,
        admin: {
            privateKey: process.env.DEPLOYER_PRIVATE_KEY
        },
        predicate:{
            native: '0x44b4d72725cd653156208a1c21dfb43463e555a0e2',
            erc20: '0x44e3cc20e8ed7024b382942f55084c97885af3ddac',
            erc721: '0x44d1cc7d4af6b7a4df3f34396406f8fce2333627eb'
        }
    },
    eth: {
        chain_id: process.env.ETH_CHAIN_ID
    },

    getContractAddresses: (network) => {
        try {
            return JSON.parse(fs.readFileSync(`${process.cwd()}/contractAddresses.json`).toString())
        } catch (e) {
            return {
                root: {
                    bsc:{

                    },
                    eth:{

                    },
                    uni:{

                    }
                },
                child: {
                    bsc:{

                    },
                    eth:{

                    },
                    uni:{

                    }
                }
            }
        }
    },
    writeContractAddresses: (contractAddresses, network) => {
        fs.writeFileSync(
            `${process.cwd()}/contractAddresses.json`,
            JSON.stringify(contractAddresses, null, 2) // Indent 2 spaces
        )
    }
}
