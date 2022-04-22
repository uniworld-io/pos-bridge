// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "./ChildTokenERC20.sol";

contract WBNBToken is ChildTokenERC20 {

    constructor() ERC20("WBNB Token", "WBNB") public{
    }
}