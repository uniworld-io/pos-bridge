// This contract is not supposed to be used in production
// It's strictly for testing purpose

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";


contract RootTokenERC20 is ERC20{
    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_){
        uint256 amount = 10**10 * (10**18);
        _mint(_msgSender(), amount);
    }

    function mint(uint256 amount) public {
        _mint(_msgSender(), amount);
    }


    function deposit() public payable{
        require(msg.value > 0, "RootTokenERC20: VALUE_LESS_THAN_ZERO");
        mint(msg.value);
        emit Deposited(_msgSender(), msg.value);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "RootTokenERC20: AMOUNT_LESS_THAN_ZERO");
        require(balanceOf(_msgSender()) >= amount, "RootTokenERC20: NOT_ENOUGH_BALANCE");
        _burn(_msgSender(), amount);
        payable(_msgSender()).transfer(amount);
        emit Withdrawn(_msgSender(), amount);
    }

}
