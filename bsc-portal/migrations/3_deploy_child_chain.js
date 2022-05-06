const ChildManager = artifacts.require("ChildChainManager");

const WETHToken = artifacts.require("WETHToken");
const WBNBToken = artifacts.require("WBNBToken");

const consensusRate = process.env.CONSENSUS_RATE;
const minValidators = process.env.MIN_VALIDATORS;
const validators = process.env.VALIDATORS.split(',');

const childManagerWalletAddress = process.env.CHILD_MANAGER_WALLET_ADDRESS;

const childChainId = 4242;

module.exports = async function (deployer) {
    // await deployer.deploy(WBNBToken, childManagerWalletAddress);
    // const wbnbToken = await WBNBToken.deployed();
    //
    // await deployer.deploy(ChildManager, consensusRate, minValidators, validators, childChainId);
    // const childManager = await ChildManager.deployed();
    //
    // console.log("ChildManager address:", childManager.address);
    // console.log("WrapToken address:", wbnbToken.address);
};

