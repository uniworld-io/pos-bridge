const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const BinanceWCENT = artifacts.require('BinanceWCENT')
const BinanceWETH = artifacts.require('BinanceWETH')
const BinanceWUNW = artifacts.require('BinanceWUNW')
const BinanceWENFT = artifacts.require('BinanceWENFT')
const BinanceWUSDT = artifacts.require('BinanceWUSDT')
const BinanceWUNFT = artifacts.require('BinanceWUNFT')

const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer;
    const childChainManager = await deployer.deploy(ChildChainManager);
    const childChainManagerProxy = await deployer.deploy(ChildChainManagerProxy, '0x0000000000000000000000000000000000000000');
    await childChainManagerProxy.updateAndCall(ChildChainManager.address, childChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        deployer.options.network_id,
        accounts[0]
    ).encodeABI());


    //create token child
    //UNI
    await deployer.deploy(BinanceWCENT, ChildChainManagerProxy.address)
    await deployer.deploy(BinanceWUNFT, ChildChainManagerProxy.address)
    await deployer.deploy(BinanceWUNW, ChildChainManagerProxy.address)

    //ETH
    await deployer.deploy(BinanceWETH, ChildChainManagerProxy.address)
    await deployer.deploy(BinanceWUSDT, ChildChainManagerProxy.address)
    await deployer.deploy(BinanceWENFT, ChildChainManagerProxy.address)


    const contractAddresses = utils.getContractAddresses(network);

    contractAddresses.child.bsc.ChildChainManager = ChildChainManager.address
    contractAddresses.child.bsc.ChildChainManagerProxy = ChildChainManagerProxy.address
    contractAddresses.child.bsc.WUNW = BinanceWUNW.address
    contractAddresses.child.bsc.WCENT = BinanceWCENT.address
    contractAddresses.child.bsc.WUNFT = BinanceWUNFT.address

    contractAddresses.child.bsc.WETH = BinanceWETH.address
    contractAddresses.child.bsc.WUSDT = BinanceWUSDT.address
    contractAddresses.child.bsc.WENFT = BinanceWENFT.address

    utils.writeContractAddresses(contractAddresses, network)
}
