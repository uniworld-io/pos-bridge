pragma solidity >=0.4.4 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./common/UContext.sol";

contract URC20 is ERC20, UContext{

    string private _name;
    string private _symbol;

    constructor(string memory name, string memory symbol) public{
        _name = name;
        symbol = symbol;
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }


    function burnFrom(address account, uint256 amount) public {
        _burnFrom(account, amount);
    }

    function getSymbol() public view returns(string memory){
        return _symbol;
    }

    function getName() public view returns(string memory){
        return _name;
    }

}