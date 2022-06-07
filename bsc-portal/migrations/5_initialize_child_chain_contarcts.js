const ChildChainManager = artifacts.require('ChildChainManager')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)

    const ChildChainManagerInstance = await ChildChainManager.at(contractAddresses.child.ChildChainManagerProxy)

    //Mapping Uni
    console.log('Mapping ERC20')
    const mapErc20 = await ChildChainManagerInstance.mapToken(contractAddresses.child.WCENT, utils.uni.chain_id, contractAddresses.root.CENT)
    console.log(mapErc20)

    console.log('Mapping ERC721')
    const mapErc721 = await ChildChainManagerInstance.mapToken(contractAddresses.child.WUNFT, utils.uni.chain_id, contractAddresses.root.UNFT)
    console.log(mapErc721)

    console.log('Mapping WUNW')
    const mapUnw = await ChildChainManagerInstance.mapToken(contractAddresses.child.WUNW, utils.uni.chain_id, contractAddresses.root.UNW)
    console.log(mapUnw)


    //Mapping Eth
    // console.log('Mapping WETH')
    // await ChildChainManagerInstance.mapToken(contractAddresses.child.WETH, utils.eth.chain_id, contractAddresses.root.ETH)

}
