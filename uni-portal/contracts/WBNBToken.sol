pragma solidity >=0.4.4 <0.6.0;

import "./WrapTokenURC20.sol";

contract WBNBToken is WrapTokenURC20 {

    constructor(address minter) WrapTokenURC20("WBNB Token", "WBNB", minter) public{
    //    _mint(_msgSender(), msg.value);
    }
}