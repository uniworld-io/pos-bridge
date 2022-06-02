
const RootChainManager = artifacts.require('RootChainManager')
const RootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const EtherPredicate = artifacts.require('EtherPredicate')

const EUSD = artifacts.require('EUSD')
const ENFT = artifacts.require('ENFT')



const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer
    console.log('deploying contracts...')
    const rootChainManager = await deployer.deploy(RootChainManager)
    const rootChainManagerProxy = await deployer.deploy(RootChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await rootChainManagerProxy.updateAndCall(BnbRootChainManager.address, rootChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        utils.eth.chain_id,
        accounts[0]
    ).encodeABI())

    // -- ERC20 Predicates Deployment, starting
    const erc20Predicate = await deployer.deploy(ERC20Predicate)
    await erc20Predicate.initialize(rootChainManagerProxy.address)

    // -- ERC721 Predicates Deployment, starting
    const erc721Predicate = await deployer.deploy(ERC721Predicate)
    await erc721Predicate.initialize(rootChainManagerProxy.address)

    // -- Ether Predicates Deployment, starting
    const etherPredicate = await deployer.deploy(EtherPredicate);
    await etherPredicate.initialize(rootChainManagerProxy.address)

    //test
    await deployer.deploy(EUSD);
    await deployer.deploy(ENFT);


    const contractAddresses = utils.getContractAddresses(network)
    contractAddresses.root.RootChainManager = RootChainManager.address
    contractAddresses.root.RootChainManagerProxy = RootChainManagerProxy.address
    contractAddresses.root.ERC20Predicate = ERC20Predicate.address
    contractAddresses.root.ERC721Predicate = ERC721Predicate.address
    contractAddresses.root.EtherPredicate = EtherPredicate.address
    contractAddresses.root.EUSD = EUSD.address
    contractAddresses.root.ENFT = ENFT.address

    utils.writeContractAddresses(contractAddresses, network)
}
