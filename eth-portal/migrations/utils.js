const fs = require('fs')

module.exports = {
    consensusRate: 50,
    minValidators: 1,
    validators: [
        '0x4b194A3fdd790c31C0559b221f182eEdC049be3f',
        '0xc0e370c9D7b37Ba906b6E853DdE9Af13b1728bD6'
    ],
    bsc: {
        chain_id: 9797
    },
    uni: {
        chain_id: 68
    },
    eth: {
        chain_id: 4242
    },

    isNetworkBsc: (network) => {
        return network.startsWith('bsc');
    },

    isNetworkEth: (network) => {
        return network.startsWith('eth');
    },

    getContractAddresses: (network) => {
        try {
            return JSON.parse(fs.readFileSync(`${process.cwd()}/contractAddresses-${network}.json`).toString())
        } catch (e) {
            return {
                root: {},
                child: {}
            }
        }
    },
    writeContractAddresses: (contractAddresses, network) => {
        fs.writeFileSync(
            `${process.cwd()}/contractAddresses-${network}.json`,
            JSON.stringify(contractAddresses, null, 2) // Indent 2 spaces
        )
    }
}
