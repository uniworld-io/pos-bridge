const RootTokenERC20 = artifacts.require("RootTokenERC20");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const RootManager = artifacts.require("RootChainManager");

module.exports = async function (deployer) {

    // await deployer.deploy(RootTokenERC20, "RootTokenERC20", "RERC20");
    // const rootTokenERC20 = await RootTokenERC20.deployed();
    //
    // await deployer.deploy(ERC20Predicate);
    // const erc20Predicate = await ERC20Predicate.deployed();
    //
    // await deployer.deploy(RootManager);
    // const rootManager = await RootManager.deployed();
    //
    // console.log('network', deployer.network);
    // console.log("RootTokenERC20:", rootTokenERC20.address);
    // console.log("Erc20Predicate address:", erc20Predicate.address);
    // console.log("RootManager address:", rootManager.address);
};
