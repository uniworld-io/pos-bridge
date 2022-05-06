const DummyERC20 = artifacts.require("DummyERC20");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const RootManager = artifacts.require("RootChainManager");

const consensusRate = process.env.CONSENSUS_RATE;
const minValidators = process.env.MIN_VALIDATORS;
const validators = process.env.VALIDATORS.split(',');

const rootChainId = 9797

module.exports = async function (deployer) {
    //
    // await deployer.deploy(DummyERC20, "DummyERC20", "DUM");
    // const dummyErc20 = await DummyERC20.deployed();
    //
    // await deployer.deploy(ERC20Predicate);
    // const erc20Predicate = await ERC20Predicate.deployed();
    //
    // await deployer.deploy(RootManager, consensusRate, minValidators, validators, rootChainId);
    // const rootManager = await RootManager.deployed();
    //
    // console.log('network', deployer.network);
    // console.log("RootTokenERC20:", dummyErc20.address);
    // console.log("Erc20Predicate address:", erc20Predicate.address);
    // console.log("RootManager address:", rootManager.address);
};
