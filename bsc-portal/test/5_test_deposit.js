const RootManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");


const rootChainManagerAddress = '0xf1Cc28E39BcB6C62a662B5c879591f5fA66eADeD';
const depositData = '0x0000000000000000000000000000000000000000000000000000000000002645000000000000000000000000000000000000000000000000000000000000109200000000000000000000000066717810fa8a9b5f424cffabab662b63ff69a59b000000000000000000000000d5ef7a24bd2aa0872b16278017f4d1258b1c3deb0000000000000000000000006fafec4c6e8e82d5b049b4eb06ef9769729b9ee100000000000000000000000000000000000000000000000000000000000003e8';
const receiver = '0x6FAFEC4c6E8E82D5b049b4EB06eF9769729b9eE1';
const rootToken = '0xcC1fd69B8436eF5951677bFc971Cc4f27e551a35';
const childChainId = 4242;

const user = process.env.ADMIN_ADDRESS;
const managerAddress = process.env.MANAGER_ADDRESS;


module.exports = async function (deployer) {
    //
    // const rootTokenErc20 = await RootTokenERC20.at(rootToken);
    // const payable = await rootTokenErc20.deposit({from: user, value: 1000});
    // console.log(payable);
    //
    // const approve = await rootTokenErc20.approve(managerAddress, 1000, {from: user});
    // console.log(approve);
    //
    // console.log("Before test, balance: " + await rootTokenErc20.balanceOf(admin));
    //
    // const rootManager = await RootManager.at(rootChainManagerAddress);
    // const deposit = await rootManager.deposit(receiver, rootToken, childChainId, '0x00000000000000000000000000000000000000000000000000000000000003e8', {
    //     from: managerAddress
    // });
    // console.log(deposit);


    // console.log("After test, balance: " + await rootTokenErc20.balanceOf(admin));

};
