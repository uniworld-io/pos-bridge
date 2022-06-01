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
 * migrate --network mainnet
 */

// move the config here
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
var privateKeys = [
    '23e2eae41fca0f33e0fd3c1b901b1b114e75af8664fc6d88f18e48153a67aae0',
    '145a1e59cabb9d002daa36d5cc21524c0a6be9e0357de86717a18ba211ffd2d7',
    '2746e2d905ffaa2d27cbb3f8786bc6a187f0765dc37e9993a6499e6b650a1e07',
    'c2e18d816b025f333ed25f6be1566cfd3b401a69e2e409a7456e900665eb62e3'
];


const private_key = process.env.MAIN_WALLET_PRIVATE_KEY;
const test_private_key = process.env.TEST_WALLET_PRIVATE_KEY;


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
            provider: () => new HDWalletProvider(test_private_key, `https://data-seed-prebsc-1-s1.binance.org:8545/`),
            network_id: 97,
            timeoutBlocks: 2000,
            skipDryRun: true,
            networkCheckTimeout: 1000000,
            gas: 8000000      //make sure this gas allocation isn't over 4M, which is the max
        },
        bscmainnet: {
            provider: () => new HDWalletProvider(private_key, `https://bsc-dataseed1.binance.org`),
            network_id: 56,
            confirmations: 3,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        bscdev: {
            provider: () => new HDWalletProvider(privateKeys, `http://18.141.168.229:9797`),
            host: '18.141.168.229',
            port: 9797,
            network_id: 9797,
            from: '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb'

        },
        ethdev: {
            provider: () => new HDWalletProvider(privateKeys, `http://18.141.168.229:4242`),
            network_id: 4242,
            host: '18.141.168.229',
            port: 4242,
            from: '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb'
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
