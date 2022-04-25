const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const MyContractUpgrade = artifacts.require('./child/ChildChainManager');

module.exports = async function (deployer) {
    const instance = await deployProxy(MyContractUpgrade, [process.env.MAIN_WALLET_ADDRESS], { deployer ,initializer: 'initialize'});
    console.log('Deployed MyContractUpgrade: ', instance.address);
    //
    // const existing = await MyContractUpgrade.deployed();
    // await upgradeProxy(existing.address, MyContractUpgradeV2, { deployer });
    // await upgradeProxy("0x720B625a51c5b7920233ab8F48AD0Ed2e283f429", MyContractUpgradeV6, { deployer });
};