const BnbToken = artifacts.require("BnbToken");

module.exports = async function (deployer) {

    await deployer.deploy(BnbToken);
    const bnbToken = await BnbToken.deployed();
    console.log('network', deployer.network);
    console.log(bnbToken.address);
};
