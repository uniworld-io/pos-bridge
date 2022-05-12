const {mockValues} = require('../test/helpers/constants');
const ChildChainManager = artifacts.require("ChildChainManager");
const RootChainManager = artifacts.require("RootChainManager");

module.exports = async function (deployer) {
    // const rootChainManager = await RootChainManager.at(mockValues.eth.rootChainManager);
    // const childChainManager = await ChildChainManager.at(mockValues.eth.childChainManager);
    //
    // const registerPredicateErc20 = await rootChainManager.registerPredicate(
    //     mockValues.erc20Type,
    //     mockValues.eth.predicateErc20
    // );
    // console.log('Register predicate: ', registerPredicateErc20)
    //
    // const rootMap = await rootChainManager.mapToken(
    //     mockValues.erc20Type,
    //     mockValues.eth.rootTokenErc20,
    //     mockValues.bsc.chainId,
    //     mockValues.bsc.ethWrapToken);
    // console.log('Root map: ', rootMap)
    //
    //
    // const childMap = await childChainManager.mapToken(
    //     mockValues.eth.bnbWrapToken,
    //     mockValues.bsc.chainId,
    //     mockValues.bsc.rootTokenErc20
    // );
    // console.log('Root map: ', childMap)

};