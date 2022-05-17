// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "./ChildTokenERC20.sol";

contract WUNWToken is ChildTokenERC20 {
    constructor(address childChainManager) public ChildTokenERC20("WUNWToken", "WUNW", 18, childChainManager){}
}