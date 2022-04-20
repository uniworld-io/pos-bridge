pragma solidity >=0.4.4 <0.6.0;

import "./WrapTokenURC20.sol";

contract WETH is WrapTokenURC20 {

    constructor(address minter) WrapTokenURC20("WETH Token", "WETH", minter) public{
    }

}