const Web3 = require('web3');
const {rootRPC, childRPC} = require('./constants');
const RootChainManager = artifacts.require("RootChainManager");
const ChildChainManager = artifacts.require("ChildChainManager");
const ERC20Predicate = artifacts.require("ERC20Predicate");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const WBNB = artifacts.require("WBNBToken");
const WETH = artifacts.require("WETHToken");


const rootProvider = new Web3.providers.HttpProvider(rootRPC)
const childProvider = new Web3.providers.HttpProvider(childRPC)

const rootWeb3 = new Web3(rootProvider)
rootWeb3.setNetworkType = () => {} // Truffle work around for Web3Shim
const childWeb3 = new Web3(childProvider)
childWeb3.setNetworkType = () => {} // Truffle work around for Web3Shim


const setWeb3 = (contractObj, w3) => {
    contractObj.web3 = w3
    contractObj.setProvider(w3.currentProvider)
}

setWeb3(RootChainManager, rootWeb3);
setWeb3(ERC20Predicate, rootWeb3);
setWeb3(ChildChainManager, childWeb3);
setWeb3(WBNB, childWeb3);
setWeb3(RootTokenERC20, rootWeb3)
setWeb3(WETH, childWeb3);


module.exports = {
    RootChainManager,
    ChildChainManager,
    ERC20Predicate,
    WBNB,
    WETH,
    RootTokenERC20
}


