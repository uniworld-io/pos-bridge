const RootManager = artifacts.require("RootChainManager");
const ChildManager = artifacts.require("ChildChainManager");

const rootChainId = 9797;
const childChainId = 4242;

const rootTokenERC20 = '0x4b5eaBf187E3151E2C47c9e230b640d29712dA62';
const childTokenERC20 ='0x3Dd0f760fD6cd58FFC590CA38A7A0c0034cE7c7E';

const rootChainManagerAddress = '0xEc6b24cd3a50EeCE727e4eF2BfC2089404c1B683';
const childChainManagerAddress = '0x4b273ddE7590467CBe05B6060C04EB84DAAea58F';

const ERC20_TYPE = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b';
const predicateErc20Address = '0xCcA99938760A00979eeA785f445973AbBaA540bE';

const adminAddress = process.env.ADMIN_ADDRESS;

module.exports = async function (deployer) {
    //setup root
    // const rootManager = await RootManager.at(rootChainManagerAddress);
    //
    // await rootManager.initialize(adminAddress)
    //     .on('transactionHash', hash => console.log(hash));
    //
    // await rootManager.registerPredicate(ERC20_TYPE, predicateErc20Address)
    //     .on('transactionHash', hash => console.log(hash));
    //
    // await rootManager.mapToken(ERC20_TYPE, rootTokenERC20, childChainId, childTokenERC20)
    //     .on('transactionHash', hash => console.log(hash));


    // const childManager = await ChildManager.at(childChainManagerAddress);
    //
    // await childManager.initialize(adminAddress)
    //     .on('transactionHash', hash => console.log(hash));
    // await childManager.mapToken(childTokenERC20, rootChainId, rootTokenERC20)
    //     .on('transactionHash', hash => console.log(hash));

};