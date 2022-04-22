pragma solidity >=0.4.4 <0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./UContext.sol";

contract URC721 is ERC721, UContext{

    string private _name;
    string private _symbol;

    constructor(string memory name, string memory symbol) public{
        _name = name;
        symbol = symbol;
    }

    function getSymbol() public view returns(string memory){
        return _symbol;
    }

    function getName() public view returns(string memory){
        return _name;
    }

}