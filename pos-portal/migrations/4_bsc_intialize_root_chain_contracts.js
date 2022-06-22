const BscRootChainManager = artifacts.require('BscRootChainManager')
const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const BnbPredicate = artifacts.require('BnbPredicate')
const utils = require('./utils')

module.exports = async (deployer, network) => {
    await deployer;
    console.log('initialize contracts...', deployer.options)
    const contractAddresses = utils.getContractAddresses(network)
    /////////BSC CHAIN
    const RootChainManagerInstance = await BscRootChainManager.at(contractAddresses.root.bsc.RootChainManagerProxy)
    const BnbPredicateInstance = await BnbPredicate.at(contractAddresses.root.bsc.BnbPredicate)
    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.bsc.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.bsc.ERC721Predicate)


    //Register predicate
    console.log('Registering ERC20Predicate')
    const ERC20Type = await ERC20PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC20Type, ERC20PredicateInstance.address)

    console.log('Registering ERC721Predicate')
    const ERC721Type = await ERC721PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC721Type, ERC721PredicateInstance.address)

    console.log('Registering NativePredicate')
    const NativeType = await BnbPredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(NativeType, BnbPredicateInstance.address)

    console.log('Mapping Bnb')
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.bsc.BNB, utils.uni.chain_id, contractAddresses.child.uni.WBNB)
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.bsc.BNB, utils.eth.chain_id, contractAddresses.child.eth.WBNB)

    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.bsc.BUSD, utils.uni.chain_id, contractAddresses.child.uni.WBUSD)
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.bsc.BUSD, utils.eth.chain_id, contractAddresses.child.eth.WBUSD)

    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.bsc.BNFT, utils.uni.chain_id, contractAddresses.child.uni.WBNFT)
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.bsc.BNFT, utils.eth.chain_id, contractAddresses.child.eth.WBNFT)

}
