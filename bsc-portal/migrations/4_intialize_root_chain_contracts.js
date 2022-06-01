const BnbRootChainManager = artifacts.require('BnbRootChainManager')

const ERC20Predicate = artifacts.require('ERC20Predicate')

const ERC721Predicate = artifacts.require('ERC721Predicate')


const BnbPredicate = artifacts.require('BnbPredicate')

const utils = require('./utils')

module.exports = async(deployer) => {
    const contractAddresses = utils.getContractAddresses()

    const RootChainManagerInstance = await BnbRootChainManager.at(contractAddresses.root.RootChainManagerProxy)

    const ERC20PredicateInstance = await ERC20Predicate.at(contractAddresses.root.ERC20Predicate)
    const ERC721PredicateInstance = await ERC721Predicate.at(contractAddresses.root.ERC721Predicate)
    const BnbPredicateInstance = await BnbPredicate.at(contractAddresses.root.BnbPredicate)

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

    console.log('Registering BnbPredicate')
    const BnbType = await BnbPredicateInstance.TOKEN_TYPE();
    await RootChainManagerInstance.registerPredicate(BnbType, BnbPredicateInstance.address)


    //Mapping
    console.log('Mapping ERC20')
    await RootChainManagerInstance.mapToken(ERC20Type, contractAddresses.root.BUSD, utils.uni.chain_id, contractAddresses.child.WBUSD)

    console.log('Mapping ERC721')
    await RootChainManagerInstance.mapToken(ERC721Type, contractAddresses.root.BNFT, utils.uni.chain_id, contractAddresses.child.WBNFT)

    console.log('Mapping Bnb')
    await RootChainManagerInstance.mapToken(BnbType, contractAddresses.root.BNB, utils.uni.chain_id, contractAddresses.child.WBNB)
}
