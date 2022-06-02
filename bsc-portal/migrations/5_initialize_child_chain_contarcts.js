const ChildChainManager = artifacts.require('ChildChainManager')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses()

    const ChildChainManagerInstance = await ChildChainManager.at(contractAddresses.child.ChildChainManagerProxy)

    console.log('Mapping ERC20')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.WCENT, utils.uni.chain_id, contractAddresses.root.CENT)

    console.log('Mapping ERC721')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.WUNFT, utils.uni.chain_id, contractAddresses.root.UNFT)

    console.log('Mapping WUNW')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.WUNW, utils.uni.chain_id, contractAddresses.root.UNW)


}
