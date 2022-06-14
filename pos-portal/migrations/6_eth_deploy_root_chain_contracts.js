
const EthRootChainManager = artifacts.require('EthRootChainManager')
const EthRootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const EtherPredicate = artifacts.require('EtherPredicate')

const USDT = artifacts.require('USDT')
const ENFT = artifacts.require('ENFT')



const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer
    console.log('deploying contracts...', deployer)
    const RootChainManager = await deployer.deploy(EthRootChainManager)
    const RootChainManagerProxy = await deployer.deploy(EthRootChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await RootChainManagerProxy.updateAndCall(EthRootChainManager.address, RootChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        deployer.options.network_id,
        accounts[0]
    ).encodeABI())

    // -- ERC20 Predicates Deployment, starting
    const erc20Predicate = await deployer.deploy(ERC20Predicate)
    await erc20Predicate.initialize(RootChainManagerProxy.address)

    // -- ERC721 Predicates Deployment, starting
    const erc721Predicate = await deployer.deploy(ERC721Predicate)
    await erc721Predicate.initialize(RootChainManagerProxy.address)

    // -- Ether Predicates Deployment, starting
    const etherPredicate = await deployer.deploy(EtherPredicate);
    await etherPredicate.initialize(RootChainManagerProxy.address)

    //test
    await deployer.deploy(USDT);
    await deployer.deploy(ENFT);


    const contractAddresses = utils.getContractAddresses(network)
    contractAddresses.root.eth.RootChainManager = EthRootChainManager.address
    contractAddresses.root.eth.RootChainManagerProxy = EthRootChainManagerProxy.address
    contractAddresses.root.eth.ERC20Predicate = ERC20Predicate.address
    contractAddresses.root.eth.ERC721Predicate = ERC721Predicate.address
    contractAddresses.root.eth.EtherPredicate = EtherPredicate.address
    contractAddresses.root.eth.USDT = USDT.address
    contractAddresses.root.eth.ENFT = ENFT.address

    utils.writeContractAddresses(contractAddresses, network)
}
