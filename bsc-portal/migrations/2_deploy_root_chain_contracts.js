
const BnbRootChainManager = artifacts.require('BnbRootChainManager')
const RootChainManagerProxy = artifacts.require('RootChainManagerProxy')

const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const NativePredicate = artifacts.require('NativePredicate')

const RUSD = artifacts.require('RUSD')
const RNFT = artifacts.require('RNFT')



const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer
    let chainID;
    if(utils.isNetworkBsc(network))
        chainID = utils.bsc.chain_id;
    if(utils.isNetworkEth(network))
        chainID = utils.eth.chain_id;
    console.log('deploying contracts...')
    const rootChainManager = await deployer.deploy(BnbRootChainManager)
    const rootChainManagerProxy = await deployer.deploy(RootChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await rootChainManagerProxy.updateAndCall(BnbRootChainManager.address, rootChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        chainID,
        accounts[0]
    ).encodeABI())

    // -- ERC20 Predicates Deployment, starting
    const erc20Predicate = await deployer.deploy(ERC20Predicate)
    await erc20Predicate.initialize(rootChainManagerProxy.address)

    // -- ERC721 Predicates Deployment, starting
    const erc721Predicate = await deployer.deploy(ERC721Predicate)
    await erc721Predicate.initialize(rootChainManagerProxy.address)

    // -- Native Predicates Deployment, starting
    const nativePredicate = await deployer.deploy(NativePredicate);
    await nativePredicate.initialize(rootChainManagerProxy.address)

    //test
    await deployer.deploy(RUSD);
    await deployer.deploy(RNFT);


    const contractAddresses = utils.getContractAddresses(network)
    contractAddresses.root.RootChainManager = BnbRootChainManager.address
    contractAddresses.root.RootChainManagerProxy = RootChainManagerProxy.address
    contractAddresses.root.ERC20Predicate = ERC20Predicate.address
    contractAddresses.root.ERC721Predicate = ERC721Predicate.address
    contractAddresses.root.NativePredicate = NativePredicate.address
    contractAddresses.root.RUSD = RUSD.address
    contractAddresses.root.RNFT = RNFT.address

    utils.writeContractAddresses(contractAddresses)
}
