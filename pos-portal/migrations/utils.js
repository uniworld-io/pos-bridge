const fs = require('fs')

module.exports = {

    consensusRate: 50,
    minValidators: 1,
    validators: [
        '0x4b194A3fdd790c31C0559b221f182eEdC049be3f',
        '0xc0e370c9D7b37Ba906b6E853DdE9Af13b1728bD6'
    ],
    bsc: {
        chain_id: 9797,
        deployer: '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb'
    },
    uni: {
        chain_id: 68,
        admin: {
            privateKey: '966acb704ec6a830e0a8acc91cb0ac943b0a90f0f72cbc2c42966a3872a9cdf0'
        },
        predicate:{
            native: '0x44b4d72725cd653156208a1c21dfb43463e555a0e2',
            erc20: '0x44e3cc20e8ed7024b382942f55084c97885af3ddac',
            erc721: '0x44d1cc7d4af6b7a4df3f34396406f8fce2333627eb'
        }
    },
    eth: {
        chain_id: 4242
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
