const utils = require('./utils')
const RootChainManager = artifacts.require('RootChainManager');
const ChildChainManager = artifacts.require('ChildChainManager');
const BnbPredicate = artifacts.require('BnbPredicate');
const ERC20Predicate = artifacts.require('ERC20Predicate');
const ERC721Predicate = artifacts.require('ERC721Predicate');

module.exports = async (deployer, network) => {
    // const contractAddresses = utils.getContractAddresses(network)
    //
    // const rootChainManager = await RootChainManager.at(contractAddresses.root.RootChainManagerProxy);
    // const childChainManager = await ChildChainManager.at(contractAddresses.child.ChildChainManagerProxy);
    //
    // const BnbPredicateInstance = await BnbPredicate.at(contractAddresses.root.BnbPredicate)
    // const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.ERC20Predicate)
    // const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.ERC721Predicate)
    //
    // //Register predicate
    // const ERC20Type = await ERC20PredicateInstance.TOKEN_TYPE();
    // const ERC721Type = await ERC721PredicateInstance.TOKEN_TYPE();
    // const NativeType = await BnbPredicateInstance.TOKEN_TYPE();
    // console.log(NativeType)
    // console.log(ERC20Type)
    // console.log(ERC721Type)
    //
    //
    // console.log('Root ReMapping ERC20')
    // await rootChainManager.remapToken(ERC20Type, contractAddresses.root.BUSD, utils.uni.chain_id, contractAddresses.child.UniWBUSD)
    // console.log('Root ReMapping ERC721')
    // await rootChainManager.remapToken(ERC721Type, contractAddresses.root.BNFT, utils.uni.chain_id, contractAddresses.child.UniWBNFT)
    // console.log('Root ReMapping Bnb')
    // await rootChainManager.remapToken(NativeType, contractAddresses.root.BNB, utils.uni.chain_id, contractAddresses.child.UniWBNB)
    //
    //
    // //Mapping Uni
    // console.log('Child Mapping ERC20')
    // await childChainManager.mapToken(contractAddresses.child.WCENT, utils.uni.chain_id, contractAddresses.root.CENT)
    // console.log('Child Mapping ERC721')
    // await childChainManager.mapToken(contractAddresses.child.WUNFT, utils.uni.chain_id, contractAddresses.root.UNFT)
    // console.log('Child Mapping WUNW')
    // await childChainManager.mapToken(contractAddresses.child.WUNW, utils.uni.chain_id, contractAddresses.root.UNW)
}
