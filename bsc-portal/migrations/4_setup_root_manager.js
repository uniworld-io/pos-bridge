const RootChainManager = artifacts.require("RootChainManager");
const ERC20Predicate = artifacts.require("ERC20Predicate");

const {mockValues} = require('../test/helpers/constants');

const ERC20_TYPE = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b';

module.exports = async function (deployer) {
    // const rootChainManager = await RootChainManager.at(mockValues.rootChainManager);
    // const init = await rootChainManager.initialize(
    //     mockValues.consensusRate,
    //     mockValues.minValidators,
    //     mockValues.validators,
    //     mockValues.rootChainId,
    //     mockValues.accounts[0])
    // console.log('RootChainManager initialize: ', init);
    //
    // const registerPredicate = await rootChainManager.registerPredicate(ERC20_TYPE, mockValues.erc20Predicate)
    // console.log('RootChainManager registerPredicate: ', registerPredicate);
    //
    // const mapToken = await rootChainManager.mapToken(ERC20_TYPE,
    //     mockValues.rootTokenErc20,
    //     mockValues.childChainId,
    //     mockValues.childTokenErc20);
    // console.log('RootChainManager mapToken: ', mapToken);
    //
    //
    // const erc20Predicate = await ERC20Predicate.at(mockValues.erc20Predicate);
    // const initialize = await erc20Predicate.initialize(mockValues.rootChainManager)
    // console.log('ERC20Predicate initialize: ', initialize);

};