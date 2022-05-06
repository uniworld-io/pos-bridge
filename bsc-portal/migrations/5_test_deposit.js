const RootManager = artifacts.require("RootChainManager");



const rootChainManagerAddress = '0x5391fD6ee15bB44FAeAb126dA104180A9C4adc76';
const depositData = '0x0000000000000000000000000000000000000000000000000000000000002645000000000000000000000000000000000000000000000000000000000000109200000000000000000000000066717810fa8a9b5f424cffabab662b63ff69a59b000000000000000000000000d5ef7a24bd2aa0872b16278017f4d1258b1c3deb0000000000000000000000006fafec4c6e8e82d5b049b4eb06ef9769729b9ee100000000000000000000000000000000000000000000000000000000000003e8';

module.exports = async function (deployer) {
    // const rootManager = await RootManager.at(rootChainManagerAddress);

    // await rootManager.deposit.send(depositData)
    //     .on('transactionHash', hash => console.log(hash));

    // const tokenTypeErc20 = await rootManager.tokenToType('0xB4C62cf5eDA1400202d447955CEC7391C2b1e2b1');
    // const prediacteErc20 = await rootManager.typeToPredicate(ERC20_TYPE);
    // console.log("Type of token: ", tokenTypeErc20)
    // console.log("Predicate Erc20: ", prediacteErc20)

};
