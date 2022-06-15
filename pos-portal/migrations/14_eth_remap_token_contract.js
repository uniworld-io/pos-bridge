const utils = require('./utils')
const EthRootChainManager = artifacts.require('EthRootChainManager');
const ChildChainManager = artifacts.require('ChildChainManager');
const EtherPredicate = artifacts.require('EtherPredicate');
const ERC20Predicate = artifacts.require('ERC20Predicate');
const ERC721Predicate = artifacts.require('ERC721Predicate');

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)

    const rootChainManager = await EthRootChainManager.at(contractAddresses.root.eth.RootChainManagerProxy);
    const childChainManager = await ChildChainManager.at(contractAddresses.child.eth.ChildChainManagerProxy);

    const EtherPredicateInstance = await EtherPredicate.at(contractAddresses.root.eth.EtherPredicate)
    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.eth.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.eth.ERC721Predicate)

    //Register predicate
    const ERC20Type = await ERC20PredicateInstance.TOKEN_TYPE();
    const ERC721Type = await ERC721PredicateInstance.TOKEN_TYPE();
    const NativeType = await EtherPredicateInstance.TOKEN_TYPE();
    console.log(NativeType)
    console.log(ERC20Type)
    console.log(ERC721Type)


    //Mapping root
    console.log('Root ReMapping ERC20')
    await rootChainManager.remapToken(ERC20Type, contractAddresses.root.eth.USDT, utils.uni.chain_id, contractAddresses.child.uni.WUSDT)
    await rootChainManager.remapToken(ERC20Type, contractAddresses.root.eth.USDT, utils.bsc.chain_id, contractAddresses.child.bsc.WUSDT)

    console.log('Root ReMapping ERC721')
    await rootChainManager.remapToken(ERC721Type, contractAddresses.root.eth.ENFT, utils.uni.chain_id, contractAddresses.child.uni.WENFT)
    await rootChainManager.remapToken(ERC721Type, contractAddresses.root.eth.ENFT, utils.bsc.chain_id, contractAddresses.child.bsc.WENFT)

    console.log('Root ReMapping ETH')
    await rootChainManager.remapToken(NativeType, contractAddresses.root.eth.ETH, utils.uni.chain_id, contractAddresses.child.uni.WETH)
    await rootChainManager.remapToken(NativeType, contractAddresses.root.eth.ETH, utils.bsc.chain_id, contractAddresses.child.bsc.WETH)


    //Mapping child
    console.log('Child Mapping ERC20')
    await childChainManager.mapToken(contractAddresses.child.eth.WCENT, utils.uni.chain_id, contractAddresses.root.uni.CENT)
    await childChainManager.mapToken(contractAddresses.child.eth.WBUSD, utils.bsc.chain_id, contractAddresses.root.bsc.BUSD)

    console.log('Child Mapping ERC721')
    await childChainManager.mapToken(contractAddresses.child.eth.WUNFT, utils.uni.chain_id, contractAddresses.root.uni.UNFT)
    await childChainManager.mapToken(contractAddresses.child.eth.WBNFT, utils.bsc.chain_id, contractAddresses.root.bsc.BNFT)

    console.log('Child Mapping WUNW')
    await childChainManager.mapToken(contractAddresses.child.eth.WUNW, utils.uni.chain_id, contractAddresses.root.uni.UNW)
    await childChainManager.mapToken(contractAddresses.child.eth.WBNB, utils.bsc.chain_id, contractAddresses.root.bsc.BNB)

}
