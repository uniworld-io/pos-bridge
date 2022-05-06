const RootManager = artifacts.require("RootChainManager");
const ChildManager = artifacts.require("ChildChainManager");

const rootChainId = 9797;
const childChainId = 4242;

const rootTokenERC20 = '0x66717810fa8A9b5f424CFfabab662b63FF69a59b';
const childTokenERC20 ='0x0Af894F19E8Ca1d94db8EF9150aA62a20A14846A';

const rootChainManagerAddress = '0x5391fD6ee15bB44FAeAb126dA104180A9C4adc76';
const childChainManagerAddress = '0xbC4Cc047236A3042C2065b75a64c0B2e24760A60';

const ERC20_TYPE = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b';
const predicateErc20Address = '0x0051700454a1A76e6C9d653453232a574ba5a61d';

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
    // await rootManager.mapToken(ERC20_TYPE, rootChainId, rootTokenERC20, childChainId, childTokenERC20)
    //     .on('transactionHash', hash => console.log(hash));


    // const childManager = await ChildManager.at(childChainManagerAddress);

    // await childManager.initialize(adminAddress)
    //     .on('transactionHash', hash => console.log(hash));
    // await childManager.mapToken(rootChainId, rootTokenERC20, childChainId, childTokenERC20)
    //     .on('transactionHash', hash => console.log(hash));

};