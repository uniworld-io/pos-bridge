const {mockValues} = require("../test/helpers/constants");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const RootChainManager = artifacts.require("RootChainManager");
const {deployProxy, upgradeProxy} = require('@openzeppelin/truffle-upgrades')

const ChildChainManager = artifacts.require("ChildChainManager");
const WBNBToken = artifacts.require("WBNBToken");

module.exports = async function (deployer) {
    // //root
    // const instanceRoot = await deployProxy(RootChainManager,
    //     [
    //         mockValues.consensusRate,
    //         mockValues.minValidators,
    //         mockValues.validators,
    //         mockValues.eth.chainId,
    //         mockValues.accounts[0]
    //     ],
    //     {
    //         deployer,
    //         initializer: 'initialize'
    //     });
    //
    // await deployer.deploy(ERC20Predicate);
    // const instanceERC20Pre = await ERC20Predicate.deployed();
    // await instanceERC20Pre.initialize(instanceRoot.address);
    //
    //
    // await deployer.deploy(RootTokenERC20, "RootTokenERC20", "ERC20");
    // const rootTokenERC20 = await RootTokenERC20.deployed();
    //
    // //child
    // const instanceChild = await deployProxy(ChildChainManager,
    //     [
    //         mockValues.consensusRate,
    //         mockValues.minValidators,
    //         mockValues.validators,
    //         mockValues.eth.chainId,
    //         mockValues.accounts[0]
    //     ], {
    //         deployer,
    //         initializer: 'initialize'
    //     });
    //
    // await deployer.deploy(WBNBToken, instanceChild.address);
    // const wrapToken = await WBNBToken.deployed();
    //
    //
    // console.log('network', deployer.network);
    // console.log("RootTokenERC20:", rootTokenERC20.address);
    // console.log("Erc20Predicate address:", instanceERC20Pre.address);
    // console.log("RootManager address:", instanceRoot.address);
    // console.log("ChildChain address:", instanceChild.address);
    // console.log("WrapToken address:", wrapToken.address);

};
