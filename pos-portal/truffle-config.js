/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 * truffle migrate --network mainnet
 * truffle migrate -f 2 --to 5 --network bscdev
 * truffle migrate -f 6 --to 9 --network ethdev
 */

// move the config here
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = [
    process.env.DEPLOYER_PRIVATE_KEY,
    process.env.ACCOUNT_TEST_1
];

const deployerAddress = process.env.DEPLOYER_ADDRESS;


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
        // Useful for testing. The `development` name is special - truffle uses it by default
        // if it's defined here and no other network is specified at the command line.
        // You should run a client (like ganache-cli, geth or parity) in a separate terminal
        // tab if you use this network and you must also set the `host`, `port` and `network_id`
        // options below to some value.
        //
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*"    // Any network (default: none)
        },
        bsctestnet: {
            provider: () => new HDWalletProvider(privateKeys, `https://data-seed-prebsc-1-s3.binance.org:8545/`),
            network_id: "*",
            timeoutBlocks: 100000,
            networkCheckTimeout: 1000000,
            skipDryRun: true,
            websocket: true,
            from: deployerAddress
        },
        ethtestnet: {
            provider: () => new HDWalletProvider(privateKeys, `https://kovan.infura.io/v3/9d4c7aa0db484c24ae3130619cb558da`),
            network_id: "*",
            timeoutBlocks: 100000,
            skipDryRun: true,
            networkCheckTimeout: 1000000,
            from: deployerAddress
        },
        bscmainnet: {
            provider: () => new HDWalletProvider(privateKeys, `https://bsc-dataseed1.binance.org`),
            network_id: "*",
            timeoutBlocks: 100000,
            skipDryRun: true,
            networkCheckTimeout: 1000000,
            from: deployerAddress
        },
        ethmainnet: {
            provider: () => new HDWalletProvider(privateKeys, `https://bsc-dataseed1.binance.org`),
            network_id: "*",
            timeoutBlocks: 100000,
            skipDryRun: true,
            networkCheckTimeout: 1000000,
            from: deployerAddress
        },
        bscdev: {
            provider: () => new HDWalletProvider(privateKeys, `http://18.141.168.229:9797`),
            host: '18.141.168.229',
            port: 9797,
            network_id: "*",
            from: deployerAddress
        },
        ethdev: {
            provider: () => new HDWalletProvider(privateKeys, `http://18.141.168.229:4242`),
            network_id: "*",
            host: '18.141.168.229',
            port: 4242,
            from: deployerAddress
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            // settings: {          // See the solidity docs for advice about optimization and evmVersion
             optimizer: {
               enabled: true,
               runs: 200
             },
            //  evmVersion: "byzantium"
            // }
        }
    },

    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        bscscan: '7CBFUE5IRJVAFHWF271W2E377FZVJZS9EN',
    }
    // Truffle DB is currently disabled by default; to enable it, change enabled:
    // false to enabled: true. The default storage location can also be
    // overridden by specifying the adapter settings, as shown in the commented code below.
    //
    // NOTE: It is not possible to migrate your contracts to truffle DB and you should
    // make a backup of your artifacts to a safe location before enabling this feature.
    //
    // After you backed up your artifacts you can utilize db by running migrate as follows:
    // $ truffle migrate --reset --compile-all
    //
    // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
    // }
};
