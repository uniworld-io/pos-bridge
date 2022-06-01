
const BnbRootChainManager = artifacts.require('BnbRootChainManager')
const RootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const BnbPredicate = artifacts.require('BnbPredicate')

const BUSD = artifacts.require('BUSD')
const BNFT = artifacts.require('BNFT')


const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer
    console.log('deploying contracts...')
    const rootChainManager = await deployer.deploy(BnbRootChainManager)
    const rootChainManagerProxy = await deployer.deploy(RootChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await rootChainManagerProxy.updateAndCall(BnbRootChainManager.address, rootChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        utils.bsc.chain_id,
        accounts[0]
    ).encodeABI())

    // -- ERC20 Predicates Deployment, starting
    const erc20Predicate = await deployer.deploy(ERC20Predicate)
    await erc20Predicate.initialize(rootChainManagerProxy.address)

    // -- ERC721 Predicates Deployment, starting
    const erc721Predicate = await deployer.deploy(ERC721Predicate)
    await erc721Predicate.initialize(rootChainManagerProxy.address)

    // -- Bnb Predicates Deployment, starting
    const bnbPredicate = await deployer.deploy(BnbPredicate)
    await bnbPredicate.initialize(rootChainManagerProxy.address)


    //Root test erc20token
    const BinanceUsd = await deployer.deploy(BUSD);
    //Root test erc721 token
    const BinanceNft = await deployer.deploy(BNFT);


    const contractAddresses = utils.getContractAddresses()
    contractAddresses.root.RootChainManager = BnbRootChainManager.address
    contractAddresses.root.RootChainManagerProxy = RootChainManagerProxy.address
    contractAddresses.root.ERC20Predicate = ERC20Predicate.address
    contractAddresses.root.ERC721Predicate = ERC721Predicate.address
    contractAddresses.root.BnbPredicate = BnbPredicate.address
    contractAddresses.root.BUSD = BUSD.address
    contractAddresses.root.BNFT = BNFT.address

    utils.writeContractAddresses(contractAddresses)
}
