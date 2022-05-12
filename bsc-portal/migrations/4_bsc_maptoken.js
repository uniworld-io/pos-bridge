const {mockValues} = require('../test/helpers/constants');
const ChildChainManager = artifacts.require("ChildChainManager");
const RootChainManager = artifacts.require("RootChainManager");

module.exports = async function (deployer) {
    // const rootChainManager = await RootChainManager.at(mockValues.bsc.rootChainManager);
    // const childChainManager = await ChildChainManager.at(mockValues.bsc.childChainManager);
    //
    // const registerPredicateErc20 = await rootChainManager.registerPredicate(
    //     mockValues.erc20Type,
    //     mockValues.bsc.predicateErc20
    // );
    // console.log('Register predicate: ', registerPredicateErc20)
    //
    //
    // const mapRoot = await rootChainManager.mapToken(
    //     mockValues.erc20Type,
    //     mockValues.bsc.rootTokenErc20,
    //     mockValues.eth.chainId,
    //     mockValues.eth.bnbWrapToken);
    //
    // console.log('Map root: ', mapRoot)
    //
    // const mapChild = await childChainManager.mapToken(
    //     mockValues.bsc.ethWrapToken,
    //     mockValues.eth.chainId,
    //     mockValues.eth.rootTokenErc20
    // );
    // console.log('Map child: ', mapChild)

};