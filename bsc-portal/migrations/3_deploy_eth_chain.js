const {mockValues} = require("../test/helpers/constants");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const RootManager = artifacts.require("RootChainManager");
const RootChainManagerProxy = artifacts.require('RootChainManagerProxy');
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy');

const ChildManager = artifacts.require("ChildChainManager");
const WBNBToken = artifacts.require("WBNBToken");

module.exports = async function (deployer) {
    // //root
    // await deployer.deploy(RootManager);
    // const rootManager = await RootManager.deployed();
    //
    // await deployer.deploy(RootChainManagerProxy, rootManager.address);
    // const rootChainProxy = await RootChainManagerProxy.deployed();
    //
    // await deployer.deploy(RootTokenERC20, "RootTokenERC20", "ERC20");
    // const rootTokenERC20 = await RootTokenERC20.deployed();
    //
    // await deployer.deploy(ERC20Predicate);
    // const erc20Predicate = await ERC20Predicate.deployed();
    //
    // //child
    // await deployer.deploy(ChildManager);
    // const childManager = await ChildManager.deployed();
    //
    // await deployer.deploy(ChildChainManagerProxy, childManager.address);
    // const childChainProxy = await ChildChainManagerProxy.deployed();
    //
    // await deployer.deploy(WBNBToken, childChainProxy.address);
    // const wrapToken = await WBNBToken.deployed();
    //
    //
    //
    //
    // //setup root
    // const rootChainImpl = await RootManager.at(rootChainProxy.address);
    //
    // await rootChainImpl.registerPredicate(mockValues.erc20Type, erc20Predicate.address)
    // await rootChainImpl.initialize(
    //     mockValues.consensusRate,
    //     mockValues.minValidators,
    //     mockValues.validators,
    //     mockValues.eth.chainId,
    //     mockValues.accounts[0])
    //
    //
    // //setup child
    // const childChainImpl = await ChildManager.at(childChainProxy.address);
    //
    // await childChainImpl.initialize(mockValues.consensusRate,
    //     mockValues.minValidators,
    //     mockValues.validators,
    //     mockValues.eth.chainId,
    //     mockValues.accounts[0]
    // )
    //
    // console.log('network', deployer.network);
    // console.log("RootTokenERC20:", rootTokenERC20.address);
    // console.log("Erc20Predicate address:", erc20Predicate.address);
    // console.log("RootManager address:", rootManager.address);
    // console.log("RootChainProxy address:", rootChainProxy.address);
    // console.log("WrapToken address:", wrapToken.address);
    // console.log("ChildChainProxy address:", childChainProxy.address);
};
