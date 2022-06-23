
const EthRootChainManager = artifacts.require('EthRootChainManager')
const EthRootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const EthChildChainManager = artifacts.require('ChildChainManager')
const EthChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const utils = require('./utils')

module.exports = async(deployer, network, ) => {
    console.log('Upgrading contracts...', deployer.options.network_id)
    await deployer
    const contractAddresses = utils.getContractAddresses(network)

    await deployer.deploy(EthRootChainManager)
    const RootChainManagerProxy = await EthRootChainManagerProxy.at(contractAddresses.root.eth.RootChainManagerProxy)
    const upgradeRoot = await RootChainManagerProxy.updateImplementation(EthRootChainManager.address);
    console.log(upgradeRoot.tx)

    await deployer.deploy(EthChildChainManager);
    const ChildChainManagerProxy = await EthChildChainManagerProxy.at(contractAddresses.child.eth.ChildChainManagerProxy)
    const upgradeChild = await ChildChainManagerProxy.updateImplementation(EthChildChainManager.address);
    console.log(upgradeChild.tx)


    contractAddresses.root.eth.RootChainManager = EthRootChainManager.address;
    contractAddresses.child.eth.ChildChainManager = EthChildChainManager.address;

    utils.writeContractAddresses(contractAddresses, network)

    contractAddresses.root.eth.RootChainManager = EthRootChainManager.address;
    contractAddresses.child.eth.ChildChainManager = EthChildChainManager.address;

    utils.writeContractAddresses(contractAddresses, network)

    const RootChainManager = await EthRootChainManager.at(contractAddresses.root.eth.RootChainManagerProxy);
    await RootChainManager.setChainId(deployer.options.network_id);

    const ChildChainManager = await EthChildChainManager.at(contractAddresses.child.eth.ChildChainManagerProxy);
    await ChildChainManager.setChainId(deployer.options.network_id);

    console.log('=================', await RootChainManager.rootChainId())
    console.log('=================', await ChildChainManager.childChainId())
}
