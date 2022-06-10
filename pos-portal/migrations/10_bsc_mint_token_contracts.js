const utils = require('./utils')
const BN = require('bn.js')
const BNFT = artifacts.require('BNFT');
const BUSD = artifacts.require('BUSD');

module.exports = async (deployer, network, accounts) => {
    const contractAddresses = utils.getContractAddresses(network)

    const Bnft = await BNFT.at(contractAddresses.root.BNFT);
    const Busd = await BUSD.at(contractAddresses.root.BUSD);

    const mintBusd = await Busd.mint(new BN('1000000000000000000000'), {
        from: accounts[1]
    })
    console.log(mintBusd)

    const mint1501 = await Bnft.mint(1501, {
        from: accounts[1]
    });
    console.log(mint1501)

    const mint2889 = await Bnft.mint(2889, {
        from: accounts[1]
    });
    console.log(mint2889)



}
