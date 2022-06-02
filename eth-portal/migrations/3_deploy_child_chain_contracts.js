const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const EthereumWBNB = artifacts.require('WUNWToken')
const EthereumWUNW = artifacts.require('EthereumWUNW')
const EthereumWCENT = artifacts.require('EthereumWCENT')
const EthereumWUNFT = artifacts.require('EthereumWUNFT')
const utils = require('./utils')

module.exports = async(deployer, network, accounts) => {
    deployer.then(async() => {
        const childChainManager = await deployer.deploy(ChildChainManager)
        const childChainManagerProxy = await deployer.deploy(ChildChainManagerProxy, '0x0000000000000000000000000000000000000000')
        await childChainManagerProxy.updateAndCall(childChainManager.address, childChainManager.contract.methods.initialize(
            utils.consensusRate,
            utils.minValidators,
            utils.validators,
            utils.eth.chain_id,
            accounts[0]
        ).encodeABI())


        await deployer.deploy(EthereumWBNB, ChildChainManagerProxy.address)
        await deployer.deploy(EthereumWUNW, ChildChainManagerProxy.address)
        await deployer.deploy(EthereumWCENT, ChildChainManagerProxy.address)
        await deployer.deploy(EthereumWUNFT, ChildChainManagerProxy.address)


        const contractAddresses = utils.getContractAddresses(network);

        contractAddresses.child.ChildChainManager = ChildChainManager.address
        contractAddresses.child.ChildChainManagerProxy = ChildChainManagerProxy.address

        contractAddresses.child.WUNW = EthereumWUNW.address
        contractAddresses.child.WCENT = EthereumWCENT.address
        contractAddresses.child.WUNFT = EthereumWUNFT.address

        utils.writeContractAddresses(contractAddresses, network)
    })
}
