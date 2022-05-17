const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const abi = defaultAbiCoder;
const EthCrypto = require('eth-crypto');
const Web3 = require('web3')
const {ChildChainManager} = require("../test/helpers/contracts");
const WBNBToken = artifacts.require('WBNBToken')

module.exports = async function (deployer) {
    // const erc20Token = await RootTokenERC20.at(mockValues.bsc.rootTokenErc20);
    // const rootChainManager = await RootChainManager.at(mockValues.bsc.rootChainManagerProxy);
    //
    // const mint = await erc20Token.deposit({
    //     value: 1000,
    //     from: mockValues.accounts[2]
    // })
    // console.log('Min token: ', mint);
    //
    //
    // const approve = await erc20Token.approve(
    //     mockValues.bsc.predicateErc20,
    //     mockValues.amounts[0],
    //     {
    //         from: mockValues.accounts[2]
    //     });
    // console.log('Approve for predicate: ', approve.tx);
    //
    //
    // const deposit = await rootChainManager.depositFor(
    //     mockValues.accounts[3],
    //     mockValues.bsc.rootTokenErc20,
    //     mockValues.uni.chainId,
    //     abi.encode(['uint256'], [mockValues.amounts[0]]), {
    //         from: mockValues.accounts[2]
    //     })
    // console.log('RootChainManager deposit result: ', deposit)



    // const erc20Token = await RootTokenERC20.at(mockValues.eth.rootTokenErc20);
    // const rootChainManager = await RootChainManager.at(mockValues.eth.rootChainManagerProxy);
    //
    // const mint = await erc20Token.deposit({
    //     value: 1000,
    //     from: mockValues.accounts[3]
    // })
    // console.log('Min token: ', mint);
    //
    //
    // const approve = await erc20Token.approve(
    //     mockValues.eth.predicateErc20,
    //     mockValues.amounts[0],
    //     {
    //         from: mockValues.accounts[3]
    //     });
    // console.log('Approve for predicate: ', approve.tx);
    //
    //
    // const deposit = await rootChainManager.depositFor(
    //     mockValues.accounts[3],
    //     mockValues.eth.rootTokenErc20,
    //     mockValues.bsc.chainId,
    //     abi.encode(['uint256'], [mockValues.amounts[0]]),
    //     {
    //         from: mockValues.accounts[3]
    //     })
    // console.log('RootChainManager deposit result: ', deposit)
    //

};