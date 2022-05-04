const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const ChildChainManager = artifacts.require('./child/ChildChainManager');
const RootChainManager = artifacts.require('./root/RootChainManager');
const ERC20Predicate = artifacts.require('./root/ERC20Predicate');

module.exports = async function (deployer) {
    const instance = await deployProxy(ChildChainManager, [process.env.MAIN_WALLET_ADDRESS], { deployer ,initializer: 'initialize'});
    console.log('Deployed ChildChainManager: ', instance.address);

    //Root chain


    const instanceRoot = await deployProxy(RootChainManager, [process.env.MAIN_WALLET_ADDRESS], { deployer ,initializer: 'initialize'});
    console.log('Deployed RootChainManager: ', instanceRoot.address);

    await deployer.deploy(ERC20Predicate, instanceRoot.address);
    const erc20Predicate = await ERC20Predicate.deployed();
    console.log('Deployed instanceErc20Predicate: ', erc20Predicate.address);
    //
    // const existing = await ChildChainManager.deployed();
    // await upgradeProxy(existing.address, MyContractUpgradeV2, { deployer });
    // await upgradeProxy("0x720B625a51c5b7920233ab8F48AD0Ed2e283f429", MyContractUpgradeV6, { deployer });
};