const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const abi = defaultAbiCoder;
const EthCrypto = require('eth-crypto');
const Web3 = require('web3')
const WBNBToken = artifacts.require('WBNBToken')

module.exports = async function (deployer) {

    const erc20Token = await RootTokenERC20.at(mockValues.bsc.rootTokenErc20);
    const rootChainManager = await RootChainManager.at(mockValues.bsc.rootChainManagerProxy);

    const mint = await erc20Token.deposit({
        value: 1000,
        from: mockValues.accounts[3]
    })
    console.log('Min token: ', mint);


    const approve = await erc20Token.approve(
        mockValues.bsc.predicateErc20,
        mockValues.amounts[0],
        {
            from: mockValues.accounts[3]
        });
    console.log('Approve for predicate: ', approve);


    const deposit = await rootChainManager.depositFor(mockValues.accounts[3],
        mockValues.bsc.rootTokenErc20,
        mockValues.eth.chainId,
        abi.encode(['uint256'], [mockValues.amounts[0]]), {
            from: mockValues.accounts[3]
        })
    console.log('RootChainManager deposit result: ', deposit)


    // const msg = {
    //     rootChainId: mockValues.rootChainId,
    //     rootToken: mockValues.rootTokenErc20,
    //     receiver: mockValues.accounts[3],
    //     value: abi.encode(['uint256'], [mockValues.amounts[0]])
    // }
    // const msgEncode = abi.encode(
    //     ['uint', 'address', 'address', 'bytes'],
    //     [
    //         msg.rootChainId,
    //         msg.rootToken,
    //         msg.receiver,
    //         msg.value
    //     ]);
    // const msgHash = EthCrypto.hash.keccak256([{
    //     type: "bytes",
    //     value: msgEncode
    // }]);
    // const signatures = [EthCrypto.sign(mockValues.privateKeys.validator1, msgHash)];
    //
    // console.log("Msg Encode: ", msgEncode);
    // console.log("Msg Hash: ", msgHash);
    // console.log("Msg Signatures: ", signatures);
    //
    // const recover = EthCrypto.recover(signatures[0], msgHash);
    // console.log('Recover: ', recover);
    //
    //
    // const withdrawExec = await rootChainManager.withdrawExecuted(msgHash, msgEncode, signatures);
    // console.log("Withdraw Executed: ", withdrawExec);
};