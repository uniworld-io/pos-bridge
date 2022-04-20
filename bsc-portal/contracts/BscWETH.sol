pragma solidity ^0.8.0;

import "./WrapTokenERC20.sol";

contract BscWETH is WrapTokenERC20 {


    constructor(address childChainManager) public WrapTokenERC20("Wrapped Ether", "WETH", childChainManager) {}
}
