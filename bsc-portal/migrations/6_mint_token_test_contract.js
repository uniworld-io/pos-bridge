const BUSD = artifacts.require('BUSD')
const BNFT = artifacts.require('BNFT')
const RootChainManager = artifacts.require('RootChainManager')
const utils = require('./utils')
const BN  = require('bn.js')

module.exports = async (deployer, network, accounts) => {
    // console.log(accounts);
    // const contractAddresses = utils.getContractAddresses(network)
    //
    // const rootManager = await RootChainManager.at(contractAddresses.root.RootChainManagerProxy)
    //
    // console.log(await rootManager.typeToPredicate('0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b'));
    // const busd = await BUSD.at(contractAddresses.root.BUSD);
    //
    //
    //
    // // const mintBUSD = await busd.mint(1000000000000000000*10000)
    // const approved =  await busd.approve(contractAddresses.root.ERC20Predicate, new BN('10000000000000000000000'));
    // // console.log(mintBUSD);
    // console.log(approved);
    //
    // const allowance = await busd.allowance(accounts[0], contractAddresses.root.ERC20Predicate);
    // console.log(allowance)
    //
    // const bnft = await BNFT.at(contractAddresses.root.BNFT);
    // const mint3288 = await bnft.mint(2889)
    // const mint2802 = await bnft.mint(2880)
    // console.log(mint3288)
    // console.log(mint2802)
    //
    // const approved3288 = await bnft.approve(contractAddresses.root.ERC721Predicate, 2889);
    // const approved2802 = await bnft.approve(contractAddresses.root.ERC721Predicate, 2880);
    // console.log(approved3288)
    // console.log(approved2802)
}
