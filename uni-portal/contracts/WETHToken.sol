pragma solidity >=0.4.4 <0.6.0;

import "./WrappToken.sol";

contract WETH is AbstractWrappToken {

    constructor() AbstractWrappToken("WETH Token", "WETH") public{
    //    _mint(_msgSender(), msg.value);
    }

}