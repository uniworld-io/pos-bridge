const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const WUNWToken = artifacts.require('WUNWToken')
const WCENTToken = artifacts.require('WCENTToken')
const WUNFTToken = artifacts.require('WUNFTToken')

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


        await deployer.deploy(WUNWToken, ChildChainManagerProxy.address)
        await deployer.deploy(WCENTToken, ChildChainManagerProxy.address)
        await deployer.deploy(WUNFTToken, ChildChainManagerProxy.address)


        const contractAddresses = utils.getContractAddresses();

        contractAddresses.child.ChildChainManager = ChildChainManager.address
        contractAddresses.child.ChildChainManagerProxy = ChildChainManagerProxy.address

        contractAddresses.child.WUNW = WUNWToken.address
        contractAddresses.child.WCENT = WCENTToken.address
        contractAddresses.child.WUNFT = WUNFTToken.address

        utils.writeContractAddresses(contractAddresses)
    })
}