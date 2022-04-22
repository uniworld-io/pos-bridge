pragma solidity >=0.4.4 <0.6.0;

import "./ChildTokenURC20.sol";

contract WETHToken is ChildTokenURC20 {

    constructor(address minter) ChildTokenURC20("WETH Token", "WETH") public{
    }

}