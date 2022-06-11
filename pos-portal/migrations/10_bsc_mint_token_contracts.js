const utils = require('./utils')
const BN = require('bn.js')
const BNFT = artifacts.require('BNFT');
const BUSD = artifacts.require('BUSD');

module.exports = async (deployer, network, accounts) => {
    const contractAddresses = utils.getContractAddresses(network)

    const Bnft = await BNFT.at(contractAddresses.root.bsc.BNFT);
    const Busd = await BUSD.at(contractAddresses.root.bsc.BUSD);

    const mintBusd = await Busd.mint(accounts[1], new BN('1000000000000000000000'))
    console.log(mintBusd)

    const mint1501 = await Bnft.mint(accounts[1], 1501);
    console.log(mint1501)

    const mint2889 = await Bnft.mint(accounts[1], 2889);
    console.log(mint2889)



}
