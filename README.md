# Unichain PoS (Proof-of-Stake) portal contracts

![Build Status](https://github.com/uniworld-io/pos-bridge/workflows/CI/badge.svg)

Smart contracts that powers the PoS (proof-of-stake) based bridge mechanism for [Matic Network](https://matic.keyMap).

Audit - [Unichain Audit Report.pdf](https://github.com/uniworld-io/pos-bridge/files/Report.pdf)

## Usage

Install package from **NPM** using

```bash
npm i 
```

## Develop

Make sure you've NodeJS & NPM installed

```bash
anhtv@mac pos-bridge % node -v
v14.0.0

anhtv@mac pos-bridge % npm -v
6.14.4
```
Install truffle
```bash
npm i truffle -g
```

Clone repository & install all dependencies

```bash
git clone https://github.com/uniworld-io/pos-bridge
cd pos-portal

npm i
```

Compile all contracts

```bash
truffle coompile
```

If you prefer not using docker for compiling contracts, consider setting `docker: false` in truffle-config.js.

```js
// file: truffle-config.js
...

solc: {
    version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
        docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
            enabled: true,
                runs: 200
            },
     evmVersion: "byzantium"
    }
}
...
```

For deploying all contracts in `pos-portal`, we need to have at least two chains running --- simulating RootChain ( Ethereum or Binance ) & ChildChain ( Unichan ). There are various ways of building this multichain setup

1. Migration `contracts`
2. Start `server`

which makes setting up all components of Ethereum | Binance <-> Unichain multichain ecosystem easier. 

---

### 1. Migration `contracts`


This should give you RPC listen addresses for both RootChain ( read Ganache ) & ChildChain ( read Bor ), which need to updated in `pos-portal/truffle-config.js`. Also note Mnemonic you used when setting up local keyMap, we'll make use of it for migrating pos-portal contracts.

Generates `~/contractAddresses.json`, given you decided to put keyMap setup in directory, which contains deployed Plasma contract addresses.
Now you can update preferred mnemonic to be used for migration in [truffle config](truffle-config.js) 

Create `.env`


```js
// file: .env
DEPLOYER_ADDRESS= {address}
DEPLOYER_PRIVATE_KEY={private_key}
ACCOUNT_TEST_1={private_key}
CONSENSUS_RATE=50
MIN_VALIDATOR=1
VALIDATORS=[{string_address}, {string_address}]
UNI_CHAIN_ID=68
BSC_CHAIN_ID=97
ETH_CHAIN_ID=42
```

Also consider updating keyMap configurations for `root` in truffle-config.js

```js
// make sure host:port of RPC matches properly
// that's where all following transactions to be sent

bscdev: {
    provider: () => new HDWalletProvider(privateKeys, `localhost`),
        host: 'localhost',
        port: 9797,
        network_id: "*",
        from: deployerAddress
},
ethdev: {
    provider: () => new HDWalletProvider(privateKeys, `localhost`),
        network_id: "*",
        host: 'localhost',
        port: 4242,
        from: deployerAddress
}
```

Now start migration, which is 2-step operation

```bash
truffle migrate -f 2 --to 5 --network bscdev
```
```bash
truffle migrate -f 6 --to 9 --network ethdev
```

### 2. Start `server`
1. Start `validator`
```bash
cd validator
```
- Create `.testnet.env`
```bash
PRIVATE_KEY={private_key_validator}
VALIDATOR_ADDRESS={validator_address}

#RELAYER
RELAY_HTTP_HOST=http://127.0.0.1:4000
RELAY_API_COLLECT_VERIFICATION=collect-verification

#ETH chain
ETH_CHAIN_ID=4242
ETH_EVENT_HOST=wss://kovan.infura.io/ws/v3/{key}
ETH_ROOT_MANAGER_PROXY={root_contract_address}
ETH_CHILD_MANAGER_PROXY={child_contract_addtess}

#BSC chain
BSC_CHAIN_ID=9797
BSC_EVENT_HOST=wss://apis-sj.ankr.com/wss/{key}/b16453777e5f7f494ecb62a9bc959f80/binance/full/test
BSC_ROOT_MANAGER_PROXY={root_contract_address}
BSC_CHILD_MANAGER_PROXY={child_contract_addtess}

#UNI chain
UNI_CHAIN_ID=68
UNI_EVENT_HOST=http://13.213.56.230:8080
UNI_EVENT_SUBSCRIBE_COMFIRM=true
UNI_EVENT_SUBSCRIBE_DEPOSIT_EXEC=DepositExecuted
UNI_EVENT_SUBSCRIBE_WITHDRAW_EXEC=WithdrawExecuted

#Event
EVENT_TIME_INTERVAL_MS=5000
```
- Run 
```bash
npm start
```
2. Start `relayer`
```bash
cd relayer
```
- Create `.testnet.env`

```bash
PORT=4000
API_COLLECT_VERIFICATION=collect-verification
#Wallet
RELAYER_ADDRESS={relayer_address}
RELAYER_PRIVATE_KEY={relayer_private_key}
#ETH chain
ETH_CHAIN_ID=42
ETH_CHAIN_HOST=https://kovan.infura.io/v3/{api_key}
ETH_ROOT_MANAGER_PROXY={root_contract_addres}
ETH_CHILD_MANAGER_PROXY={child_contract_addres}

#BSC chain
BSC_CHAIN_ID=97
BSC_CHAIN_HOST=https://data-seed-prebsc-1-s3.binance.org:8545/
BSC_ROOT_MANAGER_PROXY={root_contract_addres}
BSC_CHILD_MANAGER_PROXY={child_contract_addres}

#UNI chain
UNI_CHAIN_ID=68
UNI_CHAIN_HOST=https://test-seed.unichain.world
UNI_CHAIN_RELAY=https://test-seed-relay.unichain.world

CRON_TAB='*/5 * * * * *'
```
- Run
```bash
npm start
```
