pragma solidity >=0.4.4 <0.6.0;

import "./WrappToken.sol";

contract WBNB is AbstractWrappToken {

    constructor() AbstractWrappToken("WBNB Token", "WBNB") public{
    //    _mint(_msgSender(), msg.value);
    }
}