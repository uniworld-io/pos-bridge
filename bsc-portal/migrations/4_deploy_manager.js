const ChildManager = artifacts.require("ChildChainManager");
const RootManager = artifacts.require("RootChainManager");

//////ENV

const consensusRate = process.env.CONSENSUS_RATE;
const minValidators = process.env.MIN_VALIDATORS;
const validators = process.env.VALIDATORS;


module.exports = async function (deployer) {

    await deployer.deploy(ChildManager, consensusRate, minValidators, validators);
    const childManager = await ChildManager.deployed();

    await deployer.deploy(RootManager, consensusRate, minValidators, validators);
    const rootManager = await RootManager.deployed();


    console.log('network', deployer.network);
    console.log("RootManager address:", rootManager.address);
    console.log("ChildManager address:", childManager.address);

};