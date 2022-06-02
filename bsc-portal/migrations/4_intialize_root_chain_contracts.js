const BnbRootChainManager = artifacts.require('BnbRootChainManager')
const EthRootChainManager = artifacts.require('EthRootChainManager')
const ERC20Predicate = artifacts.require('ERC20Predicate')
const ERC721Predicate = artifacts.require('ERC721Predicate')
const NativePredicate = artifacts.require('NativePredicate')

const utils = require('./utils')

module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)

    let RootChainManagerInstance
    if (utils.isNetworkBsc(network)) {
        RootChainManagerInstance = await BnbRootChainManager.at(contractAddresses.root.RootChainManagerProxy)
    }
    if (utils.isNetworkEth(network)) {
        RootChainManagerInstance = await EthRootChainManager.at(contractAddresses.root.RootChainManagerProxy)
    }
    const NativePredicateInstance = await NativePredicate.at(contractAddresses.root.NativePredicate)
    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.ERC721Predicate)


    //
    // console.log('Granting manager role on ERC20Predicate')
    // const MANAGER_ROLE = await ERC20PredicateInstance.MANAGER_ROLE()
    // await ERC20PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on MintableERC20Predicate')
    // await MintableERC20PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on ERC721Predicate')
    // await ERC721PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on MintableERC721Predicate')
    // await MintableERC721PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on ERC71155Predicate')
    // await ERC1155PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on MintableERC71155Predicate')
    // await MintableERC1155PredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // console.log('Granting manager role on EtherPredicate')
    // await EtherPredicateInstance.grantRole(MANAGER_ROLE, RootChainManagerInstance.address)
    //
    // const PREDICATE_ROLE = await DummyMintableERC20Instance.PREDICATE_ROLE()
    //
    // console.log('Granting predicate role on DummyMintableERC20')
    // await DummyMintableERC20Instance.grantRole(PREDICATE_ROLE, MintableERC20PredicateInstance.address)
    //
    // console.log('Granting predicate role on DummyMintableERC721')
    // await DummyMintableERC721Instance.grantRole(PREDICATE_ROLE, MintableERC721PredicateInstance.address)
    //
    // console.log('Granting predicate role on DummyMintableERC1155')
    // await DummyMintableERC1155Instance.grantRole(PREDICATE_ROLE, MintableERC1155PredicateInstance.address)

    //Register predicate
    console.log('Registering ERC20Predicate')
    const ERC20Type = await ERC20PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC20Type, ERC20PredicateInstance.address)

    console.log('Registering ERC721Predicate')
    const ERC721Type = await ERC721PredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(ERC721Type, ERC721PredicateInstance.address)

    console.log('Registering NativePredicate')
    const NativeType = await NativePredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(NativeType, NativePredicateInstance.address)

    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.RUSD, utils.uni.chain_id, contractAddresses.child.WRUSD)
    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.RNFT, utils.uni.chain_id, contractAddresses.child.WRNFT)

    if (utils.isNetworkBsc(network)) {
        console.log('Mapping Bnb')
        await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.BNB, utils.uni.chain_id, contractAddresses.child.WBNB)
    }
    if (utils.isNetworkEth(network)) {
        console.log('Mapping Eth')
        await RootChainManagerInstance.mapToken(NativeType, contractAddresses.root.ETH, utils.uni.chain_id, contractAddresses.child.WETH)
    }
}
