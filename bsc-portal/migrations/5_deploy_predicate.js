const ERC20Predicate = artifacts.require("ERC20Predicate");

module.exports = async function (deployer) {

    await deployer.deploy(ERC20Predicate);
    const erc20Predicate = await ERC20Predicate.deployed();

    console.log('network', deployer.network);
    console.log("Erc20Predicate address:", erc20Predicate.address);
};