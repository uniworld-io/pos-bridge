
const BscRootChainManager = artifacts.require('BscRootChainManager')
const BscRootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const BscChildChainManager = artifacts.require('ChildChainManager')
const BscChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const utils = require('./utils')

module.exports = async(deployer, network) => {
    await deployer
    const contractAddresses = utils.getContractAddresses(network)

    console.log('Upgrading contracts...', deployer.options.network_id)
    await deployer.deploy(BscRootChainManager)
    const RootChainManagerProxy = await BscRootChainManagerProxy.at(contractAddresses.root.bsc.RootChainManagerProxy)
    const upgradeRoot = await RootChainManagerProxy.updateImplementation(BscRootChainManager.address);
    console.log(upgradeRoot.tx)

    await deployer.deploy(BscChildChainManager);
    const ChildChainManagerProxy = await BscChildChainManagerProxy.at(contractAddresses.child.bsc.ChildChainManagerProxy)
    const upgradeChild = await ChildChainManagerProxy.updateImplementation(BscChildChainManager.address);
    console.log(upgradeChild.tx)


    contractAddresses.root.bsc.RootChainManager = BscRootChainManager.address;
    contractAddresses.child.bsc.ChildChainManager = BscChildChainManager.address;

    utils.writeContractAddresses(contractAddresses, network)
}
