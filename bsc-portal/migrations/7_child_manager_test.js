const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const ChildChainManager = artifacts.require("ChildChainManager");
const abi = defaultAbiCoder;
const WBNB = artifacts.require("WBNBToken");

module.exports = async function (deployer) {

    // const msg = "0x0000000000000000000000000000000000000000000000000000000000000044000000000000000000000000000000000000000000000000000000000000006100000000000000000000000016748f8d05163e917388fa79050bafe5a30faa2f0000000000000000000000004b58913337d93be4755072e3d0f45ca942e1175100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000186a0";
    // const sign = "0x2fccfdfa5408e5e7a4c6033ba07d4925ebab533fc0fa9dbd0fff65782d9d25c716b7168431fe2dcb5055a423c6ba744a6f0195a4bcabdce0d7a0e45790a043e61b";
    //
    // const childManager = await ChildChainManager.at(mockValues.bsc.childChainManagerProxy);
    // const depositExec = await childManager.depositExecuted(
    //     msg,
    //     [sign],
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // )
    // console.log('Child manager deposit executed: ', depositExec)
    //
    // const withdraw = await childManager.withdraw(
    //     mockValues.accounts[2],
    //     mockValues.bsc.uniWrapToken,
    //     "0x00000000000000000000000000000000000000000000000000000000000186a0",
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // )
    // console.log('Child manager withdraw: ', withdraw)



    // const childChainManager = await ChildChainManager.at(mockValues.eth.childChainManagerProxy);
    //
    // const withdraw = await childChainManager.withdraw(mockValues.accounts[3],
    //     mockValues.eth.bnbWrapToken,
    //     mockValues.bsc.chainId,
    //     abi.encode(['uint256'], [mockValues.amounts[0]]),{
    //         from: mockValues.accounts[3]
    //     });
    // console.log("ChildChainManager withdraw: ", withdraw)
    //
    //
    // const childToken = await WBNB.at(mockValues.eth.bnbWrapToken);
    // console.log("Balance of 0x3ca8b76a67Aa25482dCd70cAbfc05561f8F67fd3: ",
    //     await childToken.balanceOf(mockValues.accounts[3]))

};