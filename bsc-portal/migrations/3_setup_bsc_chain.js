const {mockValues} = require("../test/helpers/constants");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const ERC721Predicate = artifacts.require("ERC721Predicate");

const BnbPredicate = artifacts.require("BnbPredicate");

const WETHToken = artifacts.require("WETHToken");
const WUNWToken = artifacts.require("WUNWToken");

const ChildChainManager = artifacts.require("ChildChainManager");
const RootChainManager = artifacts.require("RootChainManager");

module.exports = async function (deployer) {

    // const rootChainManager = await RootChainManager.at(mockValues.bsc.manager.root_proxy);
    // const childChainManager = await ChildChainManager.at(mockValues.bsc.manager.child_proxy);
    //
    //
    // //predicate
    // await deployer.deploy(BnbPredicate);
    // const bnbPredicate = await BnbPredicate.deployed();
    // await bnbPredicate.initialize(rootChainManager.address);
    //
    // await deployer.deploy(ERC20Predicate);
    // const erc20Predicate = await ERC20Predicate.deployed();
    // await erc20Predicate.initialize(rootChainManager.address);
    //
    //
    // await deployer.deploy(ERC721Predicate);
    // const erc721Predicate = await ERC721Predicate.deployed();
    // await erc721Predicate.initialize(rootChainManager.address);
    //
    // //token
    //
    // await deployer.deploy(WETHToken, childChainManager.address);
    // const weth = await WETHToken.deployed();
    //
    // await deployer.deploy(WUNWToken,  childChainManager.address);
    // const wunw = await WUNWToken.deployed();
    //
    //
    // //Register predicate erc20
    // const registerPredicateErc20 = await rootChainManager.registerPredicate(
    //     mockValues.token_type.erc20,
    //     erc20Predicate.address
    // );
    //
    // const registerPredicateBnb = await rootChainManager.registerPredicate(
    //     mockValues.token_type.bnb,
    //     bnbPredicate.address
    // );
    // console.log('Register erc20 predicate: ', registerPredicateErc20.tx)
    // console.log('Register bnb predicate: ', registerPredicateBnb.tx)
    //
    //
    // //Map token uni
    // const mapRootUni = await rootChainManager.mapToken(
    //     mockValues.token_type.bnb,
    //     mockValues.bsc.token.native,
    //     mockValues.uni.chainId,
    //     mockValues.uni.token.wbnb);
    //
    // const mapChildUni = await childChainManager.mapToken(
    //     wunw.address,
    //     mockValues.uni.chainId,
    //     mockValues.uni.token.native
    // );
    // console.log('Map root uni: ', mapRootUni)
    // console.log('Map child uni: ', mapChildUni)
    //
    // console.log("Erc20Predicate address:", erc20Predicate.address);
    // console.log("Erc721Predicate address:", erc721Predicate.address);
    // console.log("BnbPredicate address:", bnbPredicate.address);
    // console.log("WETH address:", weth.address);
    // console.log("WUNW address:", wunw.address);

};
