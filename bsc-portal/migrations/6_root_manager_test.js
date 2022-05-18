const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const abi = defaultAbiCoder;
const EthCrypto = require('eth-crypto');
const Web3 = require('web3')
const ChildChainManager = artifacts.require("ChildChainManager");
const {createTransactionResult} = require("truffle-assertions");
const WBNBToken = artifacts.require('WBNBToken')
const WUNWToken = artifacts.require('WUNWToken')

module.exports = async function (deployer) {
    //Deposit BNB to WBNB
    // const rootChainManager = await RootChainManager.at(mockValues.bsc.manager.root_proxy);
    // const depositBnb = await rootChainManager.depositNativeFor(
    //     mockValues.accounts[3],
    //     mockValues.uni.chainId,
    //     {
    //         from: mockValues.accounts[3],
    //         value: 1000
    //     }
    // )
    // console.log("Result deposit: ", depositBnb);


    //Withdraw WUNW to UNW
    const childChainManager = await ChildChainManager.at(mockValues.bsc.manager.child_proxy);
    const withdraw = await childChainManager.withdraw(
        mockValues.accounts[3],
        mockValues.bsc.token.wunw,
        "0x00000000000000000000000000000000000000000000000000000000000003e8",
        {
            from: mockValues.accounts[3]
        }
    )
    console.log("Result withdraw: ", withdraw);




    //Show WUNW
    // const wunw = await WUNWToken.at(mockValues.bsc.token.wunw);
    // const blanceOfAcc2 = await wunw.balanceOf(mockValues.accounts[3]);
    // console.log(blanceOfAcc2)


};