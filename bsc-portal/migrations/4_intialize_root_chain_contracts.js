const RootChainManager = artifacts.require('RootChainManager')
const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const BnbPredicate = artifacts.require('BnbPredicate')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)

    const RootChainManagerInstance = await RootChainManager.at(contractAddresses.root.RootChainManagerProxy)
    const BnbPredicateInstance = await BnbPredicate.at(contractAddresses.root.BnbPredicate)
    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.ERC721Predicate)


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

    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.BUSD, utils.uni.chain_id, contractAddresses.child.UniWBUSD)
    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.BNFT, utils.uni.chain_id, contractAddresses.child.UniWBNFT)
    console.log('Mapping Bnb')
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.BNB, utils.uni.chain_id, contractAddresses.child.UniWBNB)


}
