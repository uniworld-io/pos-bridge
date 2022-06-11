const ChildChainManager = artifacts.require('ChildChainManager')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)

    const ChildChainManagerInstance = await ChildChainManager.at(contractAddresses.child.eth.ChildChainManagerProxy)

    console.log('Mapping ERC20')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WCENT, utils.uni.chain_id, contractAddresses.root.uni.CENT)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WBUSD, utils.bsc.chain_id, contractAddresses.root.bsc.BUSD)

    console.log('Mapping ERC721')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WUNFT, utils.uni.chain_id, contractAddresses.root.uni.UNFT)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WBNFT, utils.bsc.chain_id, contractAddresses.root.bsc.BNFT)

    console.log('Mapping NATIVE')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WUNW, utils.uni.chain_id, contractAddresses.root.uni.UNW)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.eth.WBNB, utils.bsc.chain_id, contractAddresses.root.bsc.BNB)


}
