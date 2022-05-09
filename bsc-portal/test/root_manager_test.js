
const {defaultAbiCoder} = require('ethers/utils/abi-coder');
const {mockValues} = require('./helpers/constants');
const RootChainManager = artifacts.require("RootChainManager");
const RootTokenERC20 = artifacts.require("RootTokenERC20");

const assert = require("assert");

const abi = defaultAbiCoder;


contract('RootTokenERC20', async (accounts) => {
    const instance = await RootTokenERC20.at(mockValues.rootTokenErc20);
    it('RootTokenERC20 Approval', async () => {
        const allowance = await instance.allowance(mockValues.accounts[3], mockValues.erc20Predicate);
        const approve = await instance.approve(mockValues.erc20Predicate, mockValues.amounts[0], {
            from: mockValues.accounts[3]
        });
        console.log('Approve for predicate: ', approve);
        assert(allowance + mockValues.amounts[0], instance.allowance(mockValues.accounts[3], mockValues.erc20Predicate))
    })
})

contract('RootChainManager', async (accounts) => {
    const instance = await RootChainManager.at(mockValues.rootChainManager);
    const deposit = await instance.deposit(mockValues.accounts[3],
        mockValues.rootTokenErc20,
        mockValues.childChainId,
        abi.encodeParameters(['uint256'], [mockValues.amounts[0]]), {
            from: mockValues.accounts[3]
        })
    console.log('RootChainManager deposit result: ', deposit)
})