const RootChainManager = artifacts.require('RootChainManager')
const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const EtherPredicate = artifacts.require('EtherPredicate')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)


    const RootChainManagerInstance = await RootChainManager.at(contractAddresses.root.RootChainManagerProxy)
    const NativePredicateInstance = await EtherPredicate.at(contractAddresses.root.EtherPredicate)
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
    const NativeType = await EtherPredicate.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(NativeType, NativePredicateInstance.address)

    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.EUSD, utils.uni.chain_id, contractAddresses.child.UniWEUSD)
    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.ENFT, utils.uni.chain_id, contractAddresses.child.UniWENFT)
    console.log('Mapping Ether')
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.ETH, utils.uni.chain_id, contractAddresses.child.UniWETH)
}
