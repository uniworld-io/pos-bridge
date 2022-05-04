const BnbToken = artifacts.require("BnbToken");
const WethToken = artifacts.require("BscWETH");

const WBNBToken = artifacts.require("WBNBToken");
const WETHToken = artifacts.require("WETHToken");

const ChildManager = artifacts.require("ChildChainManager");
const RootManager = artifacts.require("RootChainManager");

//////ENV

const childManagerWalletAddress = process.env.CHILD_MANAGER_WALLET_ADDRESS;
const rootManagerWalletAddress = process.env.ROOT_MANAGER_WALLET_ADDRESS;
const consensusRate = process.env.CONSENSUS_RATE;
const minValidators = process.env.MIN_VALIDATORS;
const validators = process.env.VALIDATORS;

module.exports = async function (deployer) {
    await deployer.deploy(WBNBToken, childManagerWalletAddress);
    const wbnbToken = await WBNBToken.deployed();

    await deployer.deploy(WETHToken, childManagerWalletAddress);
    const wethToken = await WETHToken.deployed();

    await deployer.deploy(ChildManager, consensusRate, minValidators, validators);
    const childManager = await ChildManager.deployed();

    await deployer.deploy(RootManager, consensusRate, minValidators, validators);
    const rootManager = await RootManager.deployed();


    console.log('network', deployer.network);
    console.log("WBNBToken:", wbnbToken.address);
    console.log("ETHToken:", wethToken.address);
    console.log("RootManager address:", rootManager.address);
    console.log("ChildManager address:", childManager.address);



    // await deployer.deploy(BnbToken);
    // const bnbToken = await BnbToken.deployed();
    //
    // await deployer.deploy(WethToken, process.env.MAIN_WALLET_ADDRESS);
    // const wethToken = await BnbToken.deployed();
    //
    // console.log('network', deployer.network);
    // console.log("bnbToken:",bnbToken.address);
    // console.log("weth:",wethToken.address);
};
