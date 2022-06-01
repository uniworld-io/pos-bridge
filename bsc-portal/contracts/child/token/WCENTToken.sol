// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "./ChildTokenERC20.sol";

contract WCENTToken is ChildTokenERC20 {

    constructor(address childChainManager) public ChildTokenERC20("WCENTToken", "WCENT", 0, childChainManager){}
}
