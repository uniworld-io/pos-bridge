const EthRootChainManager = artifacts.require('EthRootChainManager')
const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const EtherPredicate = artifacts.require('EtherPredicate')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    await deployer
    const contractAddresses = utils.getContractAddresses(network)

    const RootChainManagerInstance = await EthRootChainManager.at(contractAddresses.root.eth.RootChainManagerProxy)
    const NativePredicateInstance = await EtherPredicate.at(contractAddresses.root.eth.EtherPredicate)
    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.eth.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.eth.ERC721Predicate)

    //Register predicate
    console.log('Registering ERC20Predicate')
    const ERC20Type = await ERC20PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC20Type, ERC20PredicateInstance.address)

    console.log('Registering ERC721Predicate')
    const ERC721Type = await ERC721PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC721Type, ERC721PredicateInstance.address)

    console.log('Registering NativePredicate')
    const NativeType = await NativePredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(NativeType, NativePredicateInstance.address)

    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.eth.USDT, utils.uni.chain_id, contractAddresses.child.uni.WUSDT)
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.eth.USDT, utils.bsc.chain_id, contractAddresses.child.bsc.WUSDT)

    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.eth.ENFT, utils.uni.chain_id, contractAddresses.child.uni.WENFT)
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.eth.ENFT, utils.bsc.chain_id, contractAddresses.child.bsc.WENFT)

    console.log('Mapping Ether')
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.eth.ETH, utils.uni.chain_id, contractAddresses.child.uni.WETH)
    await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.eth.ETH, utils.bsc.chain_id, contractAddresses.child.bsc.WETH)

}
