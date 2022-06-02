const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const BinanceWCENT = artifacts.require('BinanceWCENT')
const BinanceWETH = artifacts.require('BinanceWETH')
const BinanceWUNW = artifacts.require('BinanceWUNW')
const BinanceWUNFT = artifacts.require('BinanceWUNFT')

const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    deployer.then(async() => {

        const childChainManager = await deployer.deploy(ChildChainManager)
        const childChainManagerProxy = await deployer.deploy(ChildChainManagerProxy, '0x0000000000000000000000000000000000000000')
        await childChainManagerProxy.updateAndCall(childChainManager.address, childChainManager.contract.methods.initialize(
            utils.consensusRate,
            utils.minValidators,
            utils.validators,
            utils.bsc.chain_id,
            accounts[0]
        ).encodeABI())


        await deployer.deploy(BinanceWCENT, ChildChainManagerProxy.address)
        await deployer.deploy(BinanceWUNFT, ChildChainManagerProxy.address)
        await deployer.deploy(BinanceWUNW, ChildChainManagerProxy.address)
        await deployer.deploy(BinanceWETH, ChildChainManagerProxy.address)


        const contractAddresses = utils.getContractAddresses(network);

        contractAddresses.child.ChildChainManager = ChildChainManager.address
        contractAddresses.child.ChildChainManagerProxy = ChildChainManagerProxy.address

        contractAddresses.child.WUNW = BinanceWUNW.address
        contractAddresses.child.WCENT = BinanceWCENT.address
        contractAddresses.child.WUNFT = BinanceWUNFT.address
        contractAddresses.child.WETH = BinanceWETH.address

        utils.writeContractAddresses(contractAddresses, network)
    })
}
