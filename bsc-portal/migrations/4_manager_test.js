const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('../test/helpers/constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");
const abi = defaultAbiCoder;
const EthCrypto = require('eth-crypto');
const Web3 = require('web3')
const ChildChainManager = artifacts.require("ChildChainManager");
const {createTransactionResult} = require("truffle-assertions");
const WBNBToken = artifacts.require('WBNBToken')
const WUNWToken = artifacts.require('WUNWToken')
const UniTestERC721 = artifacts.require("UniTestERC721");


module.exports = async function (deployer) {
    //Deposit BNB to WBNB
    const rootChainManager = await RootChainManager.at(mockValues.bsc.manager.root_proxy);
    // const depositBnb = await rootChainManager.depositNativeFor(
    //     mockValues.accounts[3],
    //     mockValues.uni.chainId,
    //     {
    //         from: mockValues.accounts[3],
    //         value: 1000
    //     }
    // )
    // console.log("Result deposit: ", depositBnb);


    //Withdraw WUNW to UNW
    // const childChainManager = await ChildChainManager.at(mockValues.bsc.manager.child_proxy);
    // const withdraw = await childChainManager.withdraw(
    //     mockValues.accounts[3],
    //     mockValues.bsc.token.wunw,
    //     "0x00000000000000000000000000000000000000000000000000000000000003e8",
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // )
    // console.log("Result withdraw: ", withdraw);

    const bnft = await UniTestERC721.at(mockValues.bsc.token.root_nft);
    // const mintNft = await bnft.mint(
    //     "0x000000000000000000000000000000000000000000000000000000048017002e",
    //     {
    //         from: mockValues.accounts[3]
    //     })
    // const seturi = await bnft.setTokenURI(
    //     "0x000000000000000000000000000000000000000000000000000000048017002e",
    //     "https://images.wonderfulday.io/erc721/tiger/19328860206",
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // )
    // console.log('Mint NFT: ', mintNft);
    // console.log('Set uri NFT: ', seturi);
    // const approve = await bnft.approve(
    //     mockValues.bsc.predicate.erc721,
    //     "0x000000000000000000000000000000000000000000000000000000048017002e",
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // );
    // console.log('Approve NFT: ', approve);

    //Deposit Nft
    // const deposit = await rootChainManager.depositFor(
    //     mockValues.accounts[3],
    //     mockValues.bsc.token.root_nft,
    //     mockValues.uni.chainId,
    //     "0x000000000000000000000000000000000000000000000000000000048017002e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000003768747470733a2f2f696d616765732e776f6e64657266756c6461792e696f2f6572633732312f74696765722f3139333238383630323036000000000000000000",
    //     {
    //         from: mockValues.accounts[3]
    //     }
    // );
    // console.log('Deposit nft: ', deposit)



    //Show WUNW
    // const wunw = await WUNWToken.at(mockValues.bsc.token.wunw);
    // const blanceOfAcc2 = await wunw.balanceOf(mockValues.accounts[3]);
    // console.log(blanceOfAcc2)


};