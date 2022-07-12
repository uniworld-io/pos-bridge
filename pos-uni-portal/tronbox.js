// move the config here
require('dotenv').config();


module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a development blockchain for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
     */

    networks: {
        devnet: {
            from: "TVUPp5f4Kqy89v97TopDfuAGdxpPZtdqHK",
            privateKey: "23e2eae41fca0f33e0fd3c1b901b1b114e75af8664fc6d88f18e48153a67aae0",
            userFeePercentage: 30, // or consume_user_resource_percent
            feeLimit: 1000000000, // or fee_limit
            originEnergyLimit: 1000000, // or origin_energy_limit
            callValue: 0, // or call_value
            fullHost: "http://13.213.56.230:8090",
            solidityNode: "http://18.136.105.112:8091",
            eventServer: "http://13.213.56.230:8181",
            network_id: "*",
        },
        mainnet: {
            // Don't put your private key here, pass it using an env variable, like:
            // PK=da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0 tronbox migrate --network mainnet
            privateKey: process.env.DEPLOYER_PRIVATE_KEY,
            userFeePercentage: 30,
            feeLimit: 100000000,
            fullNode: "https://api.uni.io",
            solidityNode: "https://api.uni.io",
            eventServer: "https://api.uni.io",
            network_id: "*"
        },

        compilers: {
            solc: {
                version: '0.8.6' // for compiler version
            }
        }
    },

    // solc compiler optimize
    solc: {
        optimizer: {
            enabled: false, // default: false, true: enable solc optimize
            runs: 200
        },
        evmVersion: 'istanbul'
    },

    plugins: [
        'truffle-plugin-verify'
    ],
};

