
const BscRootChainManager = artifacts.require('BscRootChainManager')
const BscRootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const BnbPredicate = artifacts.require('BnbPredicate')

const BUSD = artifacts.require('BUSD')
const BNFT = artifacts.require('BNFT')


const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer

    console.log('deploying contracts...', deployer[network])
    const RootChainManager = await deployer.deploy(BscRootChainManager)
    const RootChainManagerProxy = await deployer.deploy(BscRootChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await RootChainManagerProxy.updateAndCall(BscRootChainManager.address, RootChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        deployer.options.network_id,
        accounts[0]
    ).encodeABI())

    // -- ERC20 Predicates Deployment, starting
    const erc20Predicate = await deployer.deploy(ERC20Predicate)
    await erc20Predicate.initialize(BscRootChainManagerProxy.address)

    // -- ERC721 Predicates Deployment, starting
    const erc721Predicate = await deployer.deploy(ERC721Predicate)
    await erc721Predicate.initialize(BscRootChainManagerProxy.address)

    // -- Native Predicates Deployment, starting
    const nativePredicate = await deployer.deploy(BnbPredicate);
    await nativePredicate.initialize(BscRootChainManagerProxy.address)

    //test
    await deployer.deploy(BUSD);
    await deployer.deploy(BNFT);


    const contractAddresses = utils.getContractAddresses(network)
    contractAddresses.root.bsc.RootChainManager = BscRootChainManager.address;
    contractAddresses.root.bsc.RootChainManagerProxy = BscRootChainManagerProxy.address;
    contractAddresses.root.bsc.ERC20Predicate = ERC20Predicate.address;
    contractAddresses.root.bsc.ERC721Predicate = ERC721Predicate.address;
    contractAddresses.root.bsc.BnbPredicate = BnbPredicate.address;
    contractAddresses.root.bsc.BUSD = BUSD.address;
    contractAddresses.root.bsc.BNFT = BNFT.address;

    utils.writeContractAddresses(contractAddresses, network)
}
