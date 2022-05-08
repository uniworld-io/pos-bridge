const RootManager = artifacts.require("RootChainManager");
const ChildManager = artifacts.require("ChildChainManager");
const ERC20Predicate = artifacts.require("ERC20Predicate");


const rootChainId = 9797;
const childChainId = 4242;

const rootTokenERC20 = '0x2c38de6765813636DdeEc1d676b5c6B6e3D41443';
const childTokenERC20 = '0x3Dd0f760fD6cd58FFC590CA38A7A0c0034cE7c7E';

const rootChainManagerAddress = '0x4fD45D641BB5ebB7957de5e360F556d28DEF4882';
const childChainManagerAddress = '0x4b273ddE7590467CBe05B6060C04EB84DAAea58F';

const ERC20_TYPE = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b';
const predicateErc20Address = '0xef39265CCf9E78152224FbC322FC57b79056BD1F';

const adminAddress = process.env.ADMIN_ADDRESS;

const consensusRate = process.env.CONSENSUS_RATE;
const minValidators = process.env.MIN_VALIDATORS;
const validators = process.env.VALIDATORS.split(',');
const managerAddress = process.env.MANAGER_ADDRESS;

module.exports = async function (deployer) {
    //setup root
    const rootManager = await RootManager.at(rootChainManagerAddress);
    const predicateErc20 = await ERC20Predicate.at(predicateErc20Address);

    // await predicateErc20.initialize(managerAddress)
    //     .on('transactionHash', hash => console.log(hash));
    //
    // await rootManager.initialize(consensusRate, minValidators, validators, rootChainId, managerAddress)
    //     .on('transactionHash', hash => console.log(hash));

    await rootManager.registerPredicate(ERC20_TYPE, predicateErc20Address, {from: managerAddress})
        .on('transactionHash', hash => console.log(hash));

    await rootManager.mapToken(ERC20_TYPE, rootTokenERC20, childChainId, childTokenERC20, {from: managerAddress})
        .on('transactionHash', hash => console.log(hash));

    //
    // const childManager = await ChildManager.at(childChainManagerAddress);
    //
    // await childManager.initialize(consensusRate, minValidators, validators, childChainId,managerAddress)
    //     .on('transactionHash', hash => console.log(hash));
    // await childManager.mapToken(childTokenERC20, rootChainId, rootTokenERC20)
    //     .on('transactionHash', hash => console.log(hash));

};