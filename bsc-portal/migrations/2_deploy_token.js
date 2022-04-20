const BnbToken = artifacts.require("BnbToken");
const WethToken = artifacts.require("BscWETH");

module.exports = async function (deployer) {

    await deployer.deploy(BnbToken);
    const bnbToken = await BnbToken.deployed();

    await deployer.deploy(WethToken, process.env.MAIN_WALLET_ADDRESS);
    const wethToken = await BnbToken.deployed();

    console.log('network', deployer.network);
    console.log("bnbToken:",bnbToken.address);
    console.log("weth:",wethToken.address);
};
