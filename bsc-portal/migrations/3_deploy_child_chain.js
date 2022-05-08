const ChildManager = artifacts.require("ChildChainManager");

const WETHToken = artifacts.require("WETHToken");
const WBNBToken = artifacts.require("WBNBToken");

const childManagerWalletAddress = process.env.CHILD_MANAGER_WALLET_ADDRESS;

module.exports = async function (deployer) {
    // await deployer.deploy(WBNBToken, childManagerWalletAddress);
    // const wbnbToken = await WBNBToken.deployed();
    //
    // await deployer.deploy(ChildManager);
    // const childManager = await ChildManager.deployed();
    //
    // console.log("ChildManager address:", childManager.address);
    // console.log("WrapToken address:", wbnbToken.address);
};

