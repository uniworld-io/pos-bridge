const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const EthereumWBNB = artifacts.require('EthereumWBNB')
const EthereumWBUSD = artifacts.require('EthereumWBUSD')
const EthereumWBNFT = artifacts.require('EthereumWBNFT')


const EthereumWUNW = artifacts.require('EthereumWUNW')
const EthereumWCENT = artifacts.require('EthereumWCENT')
const EthereumWUNFT = artifacts.require('EthereumWUNFT')
const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    await deployer

    const childChainManager = await deployer.deploy(ChildChainManager)
    const childChainManagerProxy = await deployer.deploy(ChildChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await childChainManagerProxy.updateAndCall(ChildChainManager.address, childChainManager.contract.methods.initialize(
        utils.consensusRate,
        utils.minValidators,
        utils.validators,
        utils.eth.chain_id,
        accounts[0]
    ).encodeABI())

    //BSC
    await deployer.deploy(EthereumWBNB, ChildChainManagerProxy.address)
    await deployer.deploy(EthereumWBUSD, ChildChainManagerProxy.address)
    await deployer.deploy(EthereumWBNFT, ChildChainManagerProxy.address)


    //UNI
    await deployer.deploy(EthereumWUNW, ChildChainManagerProxy.address)
    await deployer.deploy(EthereumWCENT, ChildChainManagerProxy.address)
    await deployer.deploy(EthereumWUNFT, ChildChainManagerProxy.address)


    const contractAddresses = utils.getContractAddresses(network);

    contractAddresses.child.eth.ChildChainManager = ChildChainManager.address
    contractAddresses.child.eth.ChildChainManagerProxy = ChildChainManagerProxy.address
    //UNI
    contractAddresses.child.eth.WUNW = EthereumWUNW.address
    contractAddresses.child.eth.WCENT = EthereumWCENT.address
    contractAddresses.child.eth.WUNFT = EthereumWUNFT.address
    //BSC
    contractAddresses.child.eth.WBNB = EthereumWBNB.address
    contractAddresses.child.eth.WBUSD = EthereumWBUSD.address
    contractAddresses.child.eth.WBNFT = EthereumWBNFT.address

    utils.writeContractAddresses(contractAddresses, network)
}
