pragma solidity >=0.4.4 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./UContext.sol";

contract URC20 is ERC20, UContext{

    string private _name;
    string private _symbol;

    constructor(string memory name, string memory symbol) public{
        _name = name;
        _symbol = symbol;
    }

    function symbol() public view returns(string memory){
        return _symbol;
    }

    function name() public view returns(string memory){
        return _name;
    }

}