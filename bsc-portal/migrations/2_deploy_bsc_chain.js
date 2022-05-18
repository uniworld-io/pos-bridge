const {mockValues} = require("../test/helpers/constants");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const RootChainManager = artifacts.require("RootChainManager");
const {deployProxy, upgradeProxy} = require('@openzeppelin/truffle-upgrades')

const ChildChainManager = artifacts.require("ChildChainManager");

module.exports = async function (deployer) {
    // // root
    // const instanceRoot = await deployProxy(RootChainManager,
    //     [
    //         mockValues.consensusRate,
    //         mockValues.minValidators,
    //         mockValues.validators,
    //         mockValues.bsc.chainId,
    //         mockValues.accounts[0]
    //     ],
    //     {
    //         deployer,
    //         initializer: 'initialize'
    //     });
    //
    // //token
    // await deployer.deploy(RootTokenERC20, "RootTokenERC20", "ERC20");
    // const rootTokenERC20 = await RootTokenERC20.deployed();
    //
    // //child
    // const instanceChild = await deployProxy(ChildChainManager,
    //     [
    //         mockValues.consensusRate,
    //         mockValues.minValidators,
    //         mockValues.validators,
    //         mockValues.bsc.chainId,
    //         mockValues.accounts[0]
    //     ], {
    //         deployer,
    //         initializer: 'initialize'
    //     });
    //
    //
    // console.log("RootTokenERC20:", rootTokenERC20.address);
    // console.log("RootManager proxy address:", instanceRoot.address);
    // console.log("ChildChain proxy address:", instanceChild.address);


};
