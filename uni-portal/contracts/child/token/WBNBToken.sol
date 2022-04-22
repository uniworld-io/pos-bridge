pragma solidity >=0.4.4 <0.6.0;

import "./ChildTokenURC20.sol";

contract WBNBToken is ChildTokenURC20 {

    constructor(address minter) ChildTokenURC20("WBNB Token", "WBNB") public{
    //    _mint(_msgSender(), msg.value);
    }
}