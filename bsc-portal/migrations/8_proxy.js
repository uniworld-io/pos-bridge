const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const ChildChainManager = artifacts.require('./child/manager/ChildChainManager');
const RootChainManager = artifacts.require('./root/manager/RootChainManager');
const ERC20Predicate = artifacts.require('./root/predicate/ERC20Predicate');
const ERC721Predicate = artifacts.require('./root/predicate/ERC721Predicate');
const ERC1155Predicate = artifacts.require('./root/predicate/ERC1155Predicate');
const {mockValues} = require('../test/helpers/constants');
const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const abi = defaultAbiCoder;
const RootChainManagerProxy = artifacts.require('RootChainManagerProxy');
const ERC20_TYPE = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b';

module.exports = async function (deployer) {
    // Su dung deployProxy cua @openzeppelin/truffle-upgrades se tu dong gen ra admin proxy va dia chi vat ly
    //Link tham khao : https://docs.openzeppelin.com/upgrades-plugins/1.x/ -> cach deploy + viet code chuan proxy
    // const instanceChild = await deployProxy(ChildChainManager, [1,1,[process.env.MAIN_WALLET_ADDRESS],98,process.env.MAIN_WALLET_ADDRESS], { deployer ,initializer: 'initialize'});
    // console.log('Deployed ChildChainManager: ', instanceChild.address);
    //
    // //Root chain
    //
    // const instanceRoot = await deployProxy(RootChainManager, [1,1,[process.env.MAIN_WALLET_ADDRESS],98,process.env.MAIN_WALLET_ADDRESS], { deployer ,initializer: 'initialize'});
    // console.log('Deployed RootChainManager: ', instanceRoot.address);
    //
    // const instanceERC20Pre =await deployProxy(ERC20Predicate, [instanceRoot.address], { deployer ,initializer: 'initialize'});
    // console.log('Deployed instanceErc20Predicate: ', instanceERC20Pre.address);
    //
    // const instanceERC721Pre =await deployProxy(ERC721Predicate, [instanceRoot.address], { deployer ,initializer: 'initialize'});
    // console.log('Deployed instanceErc721Predicate: ', instanceERC721Pre.address);
    //
    // const instanceERC1155Pre =await deployProxy(ERC721Predicate, [instanceRoot.address], { deployer ,initializer: 'initialize'});
    // console.log('Deployed instanceErc1155Predicate: ', instanceERC1155Pre.address);
    //upgrade ....
    // const existing = await ChildChainManager.deployed();
    // await upgradeProxy(existing.address, MyContractUpgradeV2, { deployer });
    // await upgradeProxy("0x720B625a51c5b7920233ab8F48AD0Ed2e283f429", MyContractUpgradeV6, { deployer });

};