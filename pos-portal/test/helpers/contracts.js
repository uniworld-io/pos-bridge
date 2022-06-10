const Web3 = require('web3');
const {bscRPC, ethRPC} = require('./constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootChainManagerProxy = artifacts.require("RootChainManagerProxy");

const ChildChainManager = artifacts.require("ChildChainManager");
const ChildChainManagerProxy = artifacts.require("ChildChainManagerProxy");

const ERC20Predicate = artifacts.require("ERC20Predicate");
const ERC721Predicate = artifacts.require("ERC721Predicate");
const BnbPredicate = artifacts.require("BnbPredicate");

const BNFT = artifacts.require("BNFT");
const BUSD = artifacts.require("BUSD");

const BinanceWCENT = artifacts.require("BinanceWCENT");
const BinanceWUNW = artifacts.require("BinanceWUNW");
const BinanceWUNFT = artifacts.require("BinanceWUNFT");


const bscProvider = new Web3.providers.HttpProvider(bscRPC)
const ethProvider = new Web3.providers.HttpProvider(ethRPC)

const bscWeb3 = new Web3(bscProvider)
const ethWeb3 = new Web3(ethProvider)

const setWeb3 = (contractObj, w3) => {
    contractObj.web3 = w3
    contractObj.setProvider(w3.currentProvider)
}
//Root
setWeb3(RootChainManagerProxy, bscWeb3);
setWeb3(RootChainManager, bscWeb3);

setWeb3(ERC20Predicate, bscWeb3);
setWeb3(ERC721Predicate, bscWeb3);
setWeb3(BnbPredicate, bscWeb3);

setWeb3(BNFT, bscWeb3);
setWeb3(BUSD, bscWeb3);

//Child
setWeb3(ChildChainManagerProxy, bscWeb3);
setWeb3(ChildChainManager, bscWeb3);

setWeb3(BinanceWCENT, bscWeb3);
setWeb3(BinanceWUNW, bscWeb3);
setWeb3(BinanceUNFT, bscWeb3);


module.exports = {
    RootChainManagerProxy,
    RootChainManager,
    ChildChainManagerProxy,
    ChildChainManager,
    ERC20Predicate,
    ERC721Predicate,
    BnbPredicate,
    BNFT,
    BUSD,
    BinanceWUNW,
    BinanceWCENT,
    BinanceWUNFT
}


