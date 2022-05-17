const {mockValues} = require('../test/helpers/constants');
const ChildChainManager = artifacts.require("ChildChainManager");
const RootChainManager = artifacts.require("RootChainManager");

module.exports = async function (deployer) {
    // // const rootChainManager = await RootChainManager.at(mockValues.bsc.rootChainManager);
    // const childChainManager = await ChildChainManager.at(mockValues.bsc.childChainManager);
    //
    // //Register predicate erc20
    // const registerPredicateErc20 = await rootChainManager.registerPredicate(
    //     mockValues.erc20Type,
    //     mockValues.bsc.predicateErc20
    // );
    // console.log('Register predicate: ', registerPredicateErc20)
    //
    // //Map token eth
    // const mapRootEth = await rootChainManager.mapToken(
    //     mockValues.erc20Type,
    //     mockValues.bsc.rootTokenErc20,
    //     mockValues.eth.chainId,
    //     mockValues.eth.bnbWrapToken);
    //
    // console.log('Map root eth: ', mapRootEth)
    //
    // const mapChildEth = await childChainManager.mapToken(
    //     mockValues.bsc.ethWrapToken,
    //     mockValues.eth.chainId,
    //     mockValues.eth.rootTokenErc20
    // );
    // console.log('Map child eth: ', mapChildEth)
    //
    // //Map token uni
    // const mapRootUni = await rootChainManager.mapToken(
    //     mockValues.erc20Type,
    //     mockValues.bsc.rootTokenErc20,
    //     mockValues.uni.chainId,
    //     mockValues.uni.bnbWrapToken);
    //
    // console.log('Map root uni: ', mapRootUni)
    //
    // const mapChildUni = await childChainManager.mapToken(
    //     mockValues.bsc.uniWrapToken,
    //     mockValues.uni.chainId,
    //     mockValues.uni.tokenNative
    // );
    // console.log('Map child uni: ', mapChildUni)

};