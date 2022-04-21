pragma solidity >=0.4.4 <0.6.0;

import "./ChildTokenURC20.sol";

contract WBNBToken is ChildTokenURC20 {

    constructor(address minter) WrapTokenURC20("WBNB Token", "WBNB", minter) public{
    //    _mint(_msgSender(), msg.value);
    }
}