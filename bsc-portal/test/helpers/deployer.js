import contracts from './contracts'
import {mockValues} from "./constants";

export const deployFreshRootContracts = async (accounts) => {
    const [
        rootChainManagerLogic,
        erc20Predicate,
        erc721Predicate,
        bnbPredicate,
        BUSD,
        BNFT,
    ] = await Promise.all([
        contracts.RootChainManager.new(),
        contracts.ChildChainManager.new(),
        contracts.ERC721Predicate.new(),
        contracts.ERC20Predicate.new(),
        contracts.BnbPredicate.new(),
        contracts.BUSD.new(),
        contracts.BNFT.new(),
    ])

    const rootChainManagerProxy = await contracts.RootChainManagerProxy.new('0x0000000000000000000000000000000000000000')
    await rootChainManagerProxy.updateAndCall(rootChainManagerLogic.address, rootChainManagerLogic.contract.methods.initialize(
        mockValues.consensusRate,
        mockValues.minValidators,
        mockValues.validators,
        mockValues.bsc.chainId,
        accounts[0]
    ).encodeABI())
    const rootChainManager = await contracts.RootChainManager.at(rootChainManagerProxy.address)


    await erc20Predicate.initialize(rootChainManagerProxy.address)
    await erc721Predicate.initialize(rootChainManagerProxy.address)
    await bnbPredicate.initialize(rootChainManagerProxy.address)

    return{
        rootChainManager,
        erc20Predicate,
        erc721Predicate,
        bnbPredicate,
        BUSD,
        BNFT
    }
}

export const deployFreshChildContracts = async (accounts) => {
    const [
        childChainManagerLogic
    ] = await Promise.all([
        contracts.ChildChainManager.new()
    ])

    const childChainManagerProxy = await contracts.ChildChainManagerProxy.new('0x0000000000000000000000000000000000000000')
    await childChainManagerProxy.updateAndCall(childChainManagerLogic.address, childChainManagerLogic.contract.methods.initialize(
        mockValues.consensusRate,
        mockValues.minValidators,
        mockValues.validators,
        mockValues.bsc.chainId,
        accounts[0]
    ).encodeABI())

    const childChainManager = await contracts.RootChainManager.at(childChainManagerProxy.address)
    const WCENT = await contracts.BinanceWCENT.new(childChainManagerProxy.address)
    const WUNW = await contracts.BinanceWUNW.new(childChainManagerProxy.address)
    const WUNFT = await contracts.BinanceWUNFT.new(childChainManagerProxy.address)

    return {
        childChainManager,
        WCENT,
        WUNW,
        WUNFT
    }
}

export const deployInitializeRootContracts = async (accounts) => {
    const [
        root
    ] = await Promise.all([
        deployFreshRootContracts(accounts)
    ])

    const erc20Type = await root.erc20Predicate.TOKEN_TYPE();
    await root.rootChainManager.registerPredicate(erc20Type, root.erc20Predicate);

    const erc721Type = await root.erc721Predicate.TOKEN_TYPE();
    await root.rootChainManager.registerPredicate(erc721Type, root.erc721Predicate);

    const bnbType = await root.bnbPredicate.TOKEN_TYPE();
    await root.rootChainManager.registerPredicate(bnbType, root.bnbPredicate);

    await root.rootChainManager.mapToken(bnbType, mockValues.bsc.chainId, mockValues.bsc.BNB, mockValues.uni.chainId, mockValues.uni.BNB);
    await root.rootChainManager.mapToken(erc20Type, mockValues.bsc.chainId, mockValues.bsc.BUSD, mockValues.uni.chainId, mockValues.uni.BUSD);
    await root.rootChainManager.mapToken(erc721Type, mockValues.bsc.chainId, mockValues.bsc.BNFT, mockValues.uni.chainId, mockValues.uni.BNFT);

    return {
        root
    }
}

export const deployInitializeChildContracts = async (accounts) => {
    const [
        child
    ] = await Promise.all([
        deployFreshChildContracts(accounts)
    ])

    await child.childChainManager.mapToken(mockValues.bsc.UNW, mockValues.uni.chainId, mockValues.uni.UNW);
    await child.childChainManager.mapToken(mockValues.bsc.CENT, mockValues.uni.chainId, mockValues.uni.CENT);
    await child.childChainManager.mapToken(mockValues.bsc.UNFT, mockValues.uni.chainId, mockValues.uni.UNFT);

    return {
        child
    }
}
