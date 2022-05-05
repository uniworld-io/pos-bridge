const DummyERC20 = artifacts.require("DummyERC20");

module.exports = async function (deployer) {
    await deployer.deploy(DummyERC20, "DummyERC20", "DUM");
    const dummyErc20 = await DummyERC20.deployed();

    console.log('network', deployer.network);
    console.log("RootTokenERC20:", dummyErc20.address);
};
