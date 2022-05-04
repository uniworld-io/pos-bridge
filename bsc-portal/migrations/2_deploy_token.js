
const WBNBToken = artifacts.require("WBNBToken");
const WETHToken = artifacts.require("WETHToken");

const childManagerWalletAddress = process.env.CHILD_MANAGER_WALLET_ADDRESS;

module.exports = async function (deployer) {
    await deployer.deploy(WBNBToken, childManagerWalletAddress);
    const wbnbToken = await WBNBToken.deployed();

    await deployer.deploy(WETHToken, childManagerWalletAddress);
    const wethToken = await WETHToken.deployed();

    console.log('network', deployer.network);
    console.log("WBNBToken:", wbnbToken.address);
    console.log("ETHToken:", wethToken.address);

};
