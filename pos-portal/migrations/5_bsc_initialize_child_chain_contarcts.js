const ChildChainManager = artifacts.require('ChildChainManager')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    await deployer;
    const contractAddresses = utils.getContractAddresses(network)

    const ChildChainManagerInstance = await ChildChainManager.at(contractAddresses.child.bsc.ChildChainManagerProxy)

    //Mapping Uni
    console.log('Mapping ERC20')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WCENT, utils.uni.chain_id, contractAddresses.root.uni.CENT)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WUSDT, utils.eth.chain_id, contractAddresses.root.eth.USDT)

    console.log('Mapping ERC721')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WUNFT, utils.uni.chain_id, contractAddresses.root.uni.UNFT)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WENFT, utils.eth.chain_id, contractAddresses.root.eth.ENFT)

    console.log('Mapping WUNW')
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WUNW, utils.uni.chain_id, contractAddresses.root.uni.UNW)
    await ChildChainManagerInstance.mapToken(contractAddresses.child.bsc.WETH, utils.eth.chain_id, contractAddresses.root.eth.ETH)
}
