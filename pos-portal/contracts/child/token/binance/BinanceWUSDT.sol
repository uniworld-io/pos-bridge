// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "../ChildTokenERC20.sol";

contract BinanceWUSDT is ChildTokenERC20 {

    constructor(address childChainManager) public ChildTokenERC20("WUSDTToken", "WUSDT", 18, childChainManager){}
}
