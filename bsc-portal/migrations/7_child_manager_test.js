const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const ChildChainManager = artifacts.require("ChildChainManager");
const abi = defaultAbiCoder;
const WBNB = artifacts.require("WBNBToken");

module.exports = async function (deployer) {
    //
    // const childChainManager = await ChildChainManager.at(mockValues.childChainManager);
    //
    // const withdraw = await childChainManager.withdraw(mockValues.accounts[3],
    //     mockValues.childTokenErc20,
    //     mockValues.rootChainId,
    //     abi.encode(['uint256'], [mockValues.amounts[0]]),{
    //         from: mockValues.accounts[3]
    //     });
    // console.log("ChildChainManager withdraw: ", withdraw)


    // const childToken = await WBNB.at(mockValues.childTokenErc20);
    // console.log("Balance of 0x3ca8b76a67Aa25482dCd70cAbfc05561f8F67fd3: ",
    //     await childToken.balanceOf(mockValues.accounts[3]))

};