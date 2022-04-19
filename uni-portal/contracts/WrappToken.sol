pragma solidity >=0.4.4 <0.6.0;

import "./URC20.sol";

contract AbstractWrappToken is URC20 {

    constructor(string memory name, string memory symbol) URC20(name, symbol) public{
    //    _mint(_msgSender(), msg.value);
    }


    function deposit() external payable {
        _mint(_msgSender(), _msgValue());
    }

    function withdraw(uint256 amount) external{
        _msgSender().transfer(amount);
        burn(amount);
    }
}
